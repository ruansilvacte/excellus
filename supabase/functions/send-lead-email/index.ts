import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const logs: string[] = [];
  const log = (msg: string) => { logs.push(msg); console.log(`[SMTP] ${msg}`); };

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { name, email, phone, zip_code, square_footage, notes, scheduled_date, scheduled_time, test_only, service_id } = body;

    if (test_only) {
      if (!email) {
        return new Response(
          JSON.stringify({ error: "Missing test email address" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      log("Test mode — skipping lead save.");
    } else {
      if (!name || !email || !phone || !zip_code) {
        return new Response(
          JSON.stringify({ error: "Missing required fields", details: "name, email, phone, zip_code are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      log("Saving lead to database...");
      const insertData: Record<string, unknown> = {
        name, email, phone, zip_code, square_footage: square_footage || null, notes: notes || null,
        service_id: service_id || null,
      };
      if (scheduled_date) insertData.scheduled_date = scheduled_date;
      if (scheduled_time) insertData.scheduled_time = scheduled_time;

      const { error: insertError } = await supabase.from("leads").insert(insertData);

      if (insertError) {
        log(`Lead insert error: ${JSON.stringify(insertError)}`);
        return new Response(
          JSON.stringify({ error: "Failed to save lead", details: insertError.message, logs }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      log("Lead saved successfully.");
    }

    // 2. Fetch SMTP settings
    const smtpKeys = ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "smtp_security", "smtp_from_name", "smtp_email_template"];
    const { data: settings } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", smtpKeys);

    const smtp: Record<string, string> = {};
    settings?.forEach((s) => { smtp[s.key] = s.value; });

    const missingKeys = ["smtp_host", "smtp_port", "smtp_user", "smtp_pass"].filter(k => !smtp[k]);

    if (missingKeys.length > 0) {
      log(`SMTP not configured. Missing: ${missingKeys.join(", ")}`);
      return new Response(
        JSON.stringify({
          success: true,
          leadSaved: true,
          emailSent: false,
          emailError: `SMTP not configured. Missing settings: ${missingKeys.join(", ")}`,
          logs,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const fromName = smtp.smtp_from_name || "Cleaning Service";
    const fromEmail = smtp.smtp_user;
    const port = parseInt(smtp.smtp_port);
    const secure = smtp.smtp_security === "SSL";

    log(`SMTP config: host=${smtp.smtp_host}, port=${port}, security=${secure ? "SSL" : "TLS/STARTTLS"}, user=${smtp.smtp_user}`);

    // Validate port
    if (isNaN(port) || port < 1 || port > 65535) {
      log(`Invalid port: ${smtp.smtp_port}`);
      return new Response(
        JSON.stringify({ success: true, leadSaved: true, emailSent: false, emailError: `Invalid SMTP port: ${smtp.smtp_port}`, logs }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isTest = !!test_only;
    const subject = isTest ? "SMTP Test — Connection OK" : "Thank you for your request!";

    const renderTemplate = (template: string) =>
      template
        .replace(/\{\{name\}\}/g, name || "")
        .replace(/\{\{email\}\}/g, email || "")
        .replace(/\{\{phone\}\}/g, phone || "")
        .replace(/\{\{zip_code\}\}/g, zip_code || "")
        .replace(/\{\{square_footage\}\}/g, square_footage || "")
        .replace(/\{\{from_name\}\}/g, fromName)
        .replace(/\{\{#notes\}\}([\s\S]*?)\{\{\/notes\}\}/g, (_match: string, inner: string) =>
          notes ? inner.replace(/\{\{notes\}\}/g, notes) : ""
        )
        .replace(/\{\{#square_footage\}\}([\s\S]*?)\{\{\/square_footage\}\}/g, (_match: string, inner: string) =>
          square_footage ? inner.replace(/\{\{square_footage\}\}/g, square_footage) : ""
        )
        .replace(/\{\{notes\}\}/g, notes || "");

    let emailBody: string;
    if (isTest) {
      emailBody = `This is a test email from your admin panel.\n\nIf you received this, your SMTP settings are configured correctly!\n\nSent at: ${new Date().toISOString()}\n\nBest regards,\n${fromName}`;
    } else {
      if (smtp.smtp_email_template === undefined) {
        log("SMTP template key not found in settings.");
        return new Response(
          JSON.stringify({ success: false, leadSaved: true, emailSent: false, emailError: "Email Message Template is not configured.", logs }),
          { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      emailBody = renderTemplate(smtp.smtp_email_template);
      log("Using Email Message Template from admin settings.");
    }

    let emailSent = false;
    let emailError: string | null = null;

    try {
      const encoder = new TextEncoder();

      log(`Connecting to ${smtp.smtp_host}:${port} (${secure ? "SSL" : "TCP"})...`);
      const conn = secure
        ? await Deno.connectTls({ hostname: smtp.smtp_host, port })
        : await Deno.connect({ hostname: smtp.smtp_host, port, transport: "tcp" });
      log("Connected.");

      const readLine = async (c: Deno.Conn | Deno.TlsConn): Promise<string> => {
        const buf = new Uint8Array(4096);
        let result = "";
        const timeout = setTimeout(() => { /* noop */ }, 15000);
        try {
          while (true) {
            const n = await c.read(buf);
            if (n === null) break;
            result += new TextDecoder().decode(buf.subarray(0, n));
            if (result.includes("\r\n") && !result.match(/^\d{3}-/m)) break;
            // Multi-line responses end with "NNN " (space), not "NNN-" (dash)
            const lines = result.split("\r\n").filter(Boolean);
            const lastLine = lines[lines.length - 1];
            if (lastLine && /^\d{3} /.test(lastLine)) break;
          }
        } finally {
          clearTimeout(timeout);
        }
        return result.trim();
      };

      const send = async (c: Deno.Conn | Deno.TlsConn, cmd: string): Promise<string> => {
        const logCmd = cmd.startsWith("AUTH") || btoa(smtp.smtp_user) === cmd || btoa(smtp.smtp_pass) === cmd
          ? cmd.substring(0, Math.min(cmd.length, 10)) + "***"
          : cmd;
        log(`> ${logCmd}`);
        await c.write(encoder.encode(cmd + "\r\n"));
        const resp = await readLine(c);
        log(`< ${resp.substring(0, 200)}`);
        return resp;
      };

      const checkResp = (resp: string, expectedPrefix: string, step: string) => {
        if (!resp.startsWith(expectedPrefix)) {
          throw new Error(`SMTP ${step} failed: ${resp}`);
        }
      };

      // SMTP handshake
      const greeting = await readLine(conn);
      log(`< ${greeting.substring(0, 200)}`);
      checkResp(greeting, "220", "greeting");

      const ehloResp = await send(conn, "EHLO lovable");
      checkResp(ehloResp, "250", "EHLO");

      let activeConn: Deno.Conn | Deno.TlsConn = conn;

      if (!secure) {
        // STARTTLS
        const starttlsResp = await send(conn, "STARTTLS");
        if (!starttlsResp.startsWith("220")) {
          throw new Error(`STARTTLS not supported or failed: ${starttlsResp}`);
        }
        log("Upgrading to TLS...");
        activeConn = await Deno.startTls(conn as Deno.TcpConn, { hostname: smtp.smtp_host });
        log("TLS upgrade complete.");

        const ehlo2 = await send(activeConn, "EHLO lovable");
        checkResp(ehlo2, "250", "EHLO after STARTTLS");
      }

      // AUTH LOGIN
      const authResp = await send(activeConn, "AUTH LOGIN");
      if (!authResp.startsWith("334")) {
        throw new Error(`AUTH LOGIN not accepted: ${authResp}. Check if your SMTP server supports AUTH LOGIN.`);
      }

      const userResp = await send(activeConn, btoa(smtp.smtp_user));
      if (!userResp.startsWith("334")) {
        throw new Error(`SMTP authentication failed at username step: ${userResp}`);
      }

      const passResp = await send(activeConn, btoa(smtp.smtp_pass));
      if (!passResp.startsWith("235")) {
        throw new Error(`SMTP authentication failed: invalid credentials. Server response: ${passResp}`);
      }
      log("Authentication successful.");

      // Send mail
      const mailFromResp = await send(activeConn, `MAIL FROM:<${fromEmail}>`);
      checkResp(mailFromResp, "250", "MAIL FROM");

      const rcptResp = await send(activeConn, `RCPT TO:<${email}>`);
      checkResp(rcptResp, "250", "RCPT TO");

      const dataResp = await send(activeConn, "DATA");
      checkResp(dataResp, "354", "DATA");

      const msg =
        `From: "${fromName}" <${fromEmail}>\r\n` +
        `To: ${email}\r\n` +
        `Subject: ${subject}\r\n` +
        `Content-Type: text/plain; charset=UTF-8\r\n` +
        `\r\n` +
        `${emailBody}\r\n` +
        `.\r\n`;

      await activeConn.write(encoder.encode(msg));
      const sendResp = await readLine(activeConn);
      log(`< ${sendResp.substring(0, 200)}`);
      checkResp(sendResp, "250", "message delivery");

      await send(activeConn, "QUIT");
      try { activeConn.close(); } catch { /* ignore */ }

      emailSent = true;
      log("Email sent successfully!");
    } catch (err) {
      emailError = String(err);
      // Categorize the error for user-friendly messages
      const errStr = emailError.toLowerCase();
      let friendlyError = emailError;
      if (errStr.includes("authentication") || errStr.includes("credentials") || errStr.includes("535")) {
        friendlyError = "SMTP authentication failed. Please verify your username and password. For Gmail, use an App Password (16-digit) with 2FA enabled.";
      } else if (errStr.includes("connect") || errStr.includes("timeout") || errStr.includes("refused")) {
        friendlyError = `Could not connect to SMTP server ${smtp.smtp_host}:${port}. Check host, port, and security settings.`;
      } else if (errStr.includes("starttls")) {
        friendlyError = `STARTTLS failed on ${smtp.smtp_host}:${port}. Try using SSL (port 465) instead.`;
      } else if (errStr.includes("rcpt") || errStr.includes("recipient")) {
        friendlyError = `Recipient rejected: ${email}. The email address may be invalid.`;
      }
      log(`Email error: ${friendlyError}`);
      emailError = friendlyError;
    }

    return new Response(
      JSON.stringify({ success: emailSent, leadSaved: !test_only, emailSent, emailError, logs }),
      { status: emailSent ? 200 : 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    log(`Unexpected error: ${String(err)}`);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(err), logs }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
