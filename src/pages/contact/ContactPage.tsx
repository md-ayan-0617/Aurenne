import React, { useEffect, useState } from 'react';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const ContactPage: React.FC = () => {
  const { setActiveTheme, setCursor, resetCursor, setActiveSectionNumber } = useUiStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Private Acquisition',
    message: '',
  });

  useEffect(() => {
    setActiveTheme('contact-obsidian');
    setActiveSectionNumber('08');
  }, [setActiveTheme, setActiveSectionNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#08090A] text-[#C5C7C7] pt-28 pb-40 overflow-hidden">
      {/* ====================================================
          CONTACT HERO (Architectural Night Mood)
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-28">
        <div className="border-b border-[#C5C7C7]/15 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
              LIAISON // CONCIERGE
            </span>
            <h1 className="font-['Space_Grotesk'] text-[52px] sm:text-[84px] lg:text-[116px] font-light uppercase leading-[0.9] tracking-[-0.03em] text-[#F1EDE5]">
              Speak With <br />
              Aurenne.
            </h1>
          </div>

          <p className="font-['Space_Grotesk'] text-[15px] text-[#777774] max-w-sm text-left md:text-right">
            Direct correspondence with our curators, archivists, and Place Vendôme concierge.
          </p>
        </div>

        {/* Night Architectural Image */}
        <div className="relative w-full h-[480px] md:h-[620px] bg-[#111214] overflow-hidden border border-[#C5C7C7]/15 shadow-2xl">
          <SafeImage
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1800&auto=format&fit=crop"
            alt="Night architectural storefront in Paris"
            luxuryLabel="Paris Boutique Night"
            className="w-full h-full object-cover grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F1EDE5] bg-[#08090A]/85 px-4 py-2 border border-[#C7A66A]/30">
            MAISON STOREFRONT // 12 RUE DE LA PAIX, PARIS
          </div>
        </div>
      </section>

      {/* ====================================================
          SALON LOCATIONS & MINIMAL FORM (NO BOXES, BOTTOM BORDERS)
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Salon Details */}
        <div className="lg:col-span-5 space-y-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-4">
              BOUTIQUES & SALONS
            </span>

            <div className="space-y-8 font-['Space_Grotesk']">
              <div>
                <h3 className="font-['Bodoni_Moda'] text-[24px] text-[#F1EDE5]">
                  PARIS
                </h3>
                <p className="text-[14px] text-[#777774] mt-1 leading-relaxed">
                  12 Rue de la Paix, 75001 Paris, France <br />
                  Private appointments Tuesday through Saturday. <br />
                  <span className="font-mono text-[12px] text-[#C5C7C7]">+33 1 42 68 00 00</span>
                </p>
              </div>

              <div>
                <h3 className="font-['Bodoni_Moda'] text-[24px] text-[#F1EDE5]">
                  MILAN
                </h3>
                <p className="text-[14px] text-[#777774] mt-1 leading-relaxed">
                  Via Montenapoleone 18, 20121 Milano, Italy <br />
                  Private viewing suite by consultation. <br />
                  <span className="font-mono text-[12px] text-[#C5C7C7]">+39 02 76 00 12 00</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#C5C7C7]/10 font-mono text-[11px] text-[#777774] space-y-2">
            <div>PRESS & EDITORIAL: press@aurenne.com</div>
            <div>HIGH JEWELLERY VAULT: vault@aurenne.com</div>
            <div>SECURE COURIER TRACKING: armored@aurenne.com</div>
          </div>
        </div>

        {/* Minimal Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#111214] border border-[#C5C7C7]/15 p-8 md:p-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] block mb-2">
              DIRECT INQUIRY
            </span>
            <h2 className="font-['Bodoni_Moda'] text-[32px] sm:text-[40px] text-[#F1EDE5] mb-8">
              Send a Dispatch
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="luxury-input-group">
                  <label className="luxury-label">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="luxury-input"
                  />
                </div>

                {/* Email */}
                <div className="luxury-input-group">
                  <label className="luxury-label">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="luxury-input"
                  />
                </div>

                {/* Phone */}
                <div className="luxury-input-group">
                  <label className="luxury-label">TELEPHONE (OPTIONAL)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="luxury-input"
                  />
                </div>

                {/* Topic */}
                <div className="luxury-input-group">
                  <label className="luxury-label">TOPIC</label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="luxury-input cursor-pointer"
                  >
                    <option value="Private Acquisition" className="bg-[#111214] text-[#F1EDE5]">Private Acquisition</option>
                    <option value="Bespoke Commission" className="bg-[#111214] text-[#F1EDE5]">Bespoke Commission</option>
                    <option value="Gemmological Consultation" className="bg-[#111214] text-[#F1EDE5]">Gemmological Consultation</option>
                    <option value="Press & Loans" className="bg-[#111214] text-[#F1EDE5]">Press & Loans</option>
                  </select>
                </div>

                {/* Message */}
                <div className="luxury-input-group">
                  <label className="luxury-label">MESSAGE</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="luxury-input"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => setCursor('default', 'SEND')}
                  onMouseLeave={resetCursor}
                  className="btn-solid-luxury w-full py-4 text-[12px]"
                >
                  TRANSMIT MESSAGE →
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4 font-mono text-[13px]">
                <div className="w-12 h-12 mx-auto rounded-full border border-[#C7A66A] flex items-center justify-center text-[#C7A66A]">
                  ✓
                </div>
                <h3 className="font-['Bodoni_Moda'] text-[24px] text-[#F1EDE5]">
                  Message Received at Place Vendôme.
                </h3>
                <p className="text-[#777774] max-w-sm mx-auto">
                  Our private client director will respond to {form.email} within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-luxury mt-4"
                >
                  SEND ANOTHER DISPATCH →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
