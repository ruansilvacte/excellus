-- Refresh service descriptions & intros with sharper, premium copy.
UPDATE public.services
SET description = 'Five-star turnovers built to protect your rating. We reset your short-term rental between every guest with hotel-level attention — fresh linens, restocked essentials, spotless surfaces, perfect staging.',
    intro = 'Every booking is a new chance to earn a five-star review — or lose one. We treat your short-term rental like our own brand: same crew, same checklist, same standard, every single turnover. Hosts choose us because the result is predictable and guests notice the difference.'
WHERE slug = 'airbnb-short-term-rental';

UPDATE public.services
SET description = 'A genuinely clean home, kept that way. From dust-free shelves to sanitized kitchens and bathrooms, we deliver a calm, organized space that feels fresh the moment you walk in.',
    intro = 'Your home should be the place you exhale. Our residential service is built around consistency — the same trusted team, a detailed room-by-room checklist, and the kind of finish you only get when people actually care. No rotating strangers, no missed details, no babysitting required.'
WHERE slug = 'residential-cleaning';

UPDATE public.services
SET description = 'Spotless offices, clinics and storefronts that quietly reinforce your brand. Flexible scheduling, sanitized high-touch points, and consistent results — without disrupting your day.',
    intro = 'Clients form an impression of your business in seconds. We help you control that impression with discreet, dependable cleaning that keeps your space presentation-ready every morning. Same crew, predictable results, easy to scale across multiple locations.'
WHERE slug = 'commercial-cleaning';

UPDATE public.services
SET description = 'A top-to-bottom reset for spaces that need more than a routine clean. Baseboards, grout, vents, behind appliances — the work most companies skip is exactly what we focus on.',
    intro = 'Some homes need more than a quick refresh. Deep Cleaning is the right call before going on a recurring plan, after a long stretch without service, or whenever you simply want your space to feel new again. We restore a true, photographable standard.'
WHERE slug = 'deep-cleaning';

UPDATE public.services
SET description = 'Move-in ready cleaning after renovations and new builds. We remove construction dust for real, polish finishes, and hand back a space that''s ready to show, list or live in.',
    intro = 'Construction dust is a different kind of mess — and it ruins finishes if it''s handled the wrong way. Our post-construction crew knows how to safely clean glass, floors, fixtures and surfaces so your finished project looks the way it was designed to.'
WHERE slug = 'post-construction-cleaning';