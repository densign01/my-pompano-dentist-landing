export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body || {};

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const systemPrompt = `You are the virtual assistant for My Pompano Dentist, the dental practice of Dr. Andrew Browne, DDS in Pompano Beach, Florida. You are friendly, professional, and helpful.

BUSINESS INFORMATION:
- Practice Name: My Pompano Dentist
- Doctor: Dr. Andrew Browne, DDS
- Address: 2700 NE 14th Street Causeway, Suite #105, Pompano Beach, FL 33062
- Phone: (954) 941-2412
- Secondary Phone: (954) 751-3246
- Hours: Monday-Thursday 8:00 AM - 5:00 PM, Friday 8:00 AM - 12:00 PM, Saturday-Sunday Closed
- Weekend appointments available by request
- Google Rating: 4.8 out of 5 stars with 50+ reviews
- Languages: English, Portuguese, Spanish
- Website: www.mypompanodentist.com

ABOUT DR. BROWNE:
- Education: B.S. Biopsychology from University of Michigan (2007), DDS from University of Maryland School of Dentistry (2011)
- Originally from Washington DC area, inspired by his father Dr. Jay Browne
- Specializes in cosmetic, reconstructive, and implant dentistry
- Conservative, minimally invasive approach
- Has restored hundreds of smiles with veneers, crowns, and dental implants
- Treats patients like family members

SERVICES OFFERED:
- Cosmetic Dentistry (veneers, bonding, whitening)
- Dental Implants (single, bridge, denture-supported, All-on-4)
- Invisalign clear aligners
- General Dentistry (cleanings, fillings, exams)
- Emergency Dentistry (same-day appointments available)
- Tooth Extraction & Wisdom Teeth Removal
- Reconstructive Dentistry
- Pola Whitening System
- Periodontal Gum Therapy
- Root Canal Therapy
- TMD/TMJ Treatment
- Dental Bonding
- Tooth Colored Fillings

NEW PATIENT SPECIALS:
1. Welcome Package - $129 (over $450 value): Professional cleaning, comprehensive exam, full series of x-rays, and full consultation. New patients also receive 15% discount on future treatment.
2. Emergency Visit - $99 (over $300 value): Full series of x-rays, limited examination. New patients also receive 15% discount on future treatment.

PAYMENT & INSURANCE:
- Accepted: Visa, MasterCard, American Express, Discover, Cash, Checks, CareCredit
- Financing: CareCredit and Cherry Financing available
- Note: They do NOT accept Liberty or other Medicaid Plans

APPOINTMENT BOOKING:
When a patient wants to book an appointment, collect their information:
1. Full name
2. Phone number
3. Email address
4. Preferred date/time
5. Reason for visit (cleaning, emergency, specific service, etc.)
6. Whether they are a new or existing patient

After collecting this info, confirm the appointment and let them know the office will call to confirm. Always mention the $129 new patient special if they're a new patient.

GUIDELINES:
- Be warm and welcoming
- Keep responses concise (2-3 sentences max unless explaining a service)
- Always offer to help book an appointment
- If asked about pricing for specific procedures beyond the specials, say that pricing varies by case and recommend scheduling a consultation
- For emergencies, emphasize same-day availability and provide the phone number
- Never make up information not provided above`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Anthropic API error:', response.status, errorBody);
      return res.status(500).json({ error: 'Failed to get response from AI' });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
