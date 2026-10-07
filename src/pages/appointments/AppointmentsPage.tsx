import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

const appointmentSchema = z.object({
  type: z.string().min(1, 'Please select consultation type'),
  location: z.string().min(1, 'Please select salon location'),
  date: z.string().min(1, 'Please select date'),
  timeSlot: z.string().min(1, 'Please select time'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export const AppointmentsPage: React.FC = () => {
  const { setActiveTheme, setCursor, resetCursor, setActiveSectionNumber } = useUiStore();
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>('viewing');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      type: 'Private Collection Viewing',
      location: 'Paris — Place Vendôme',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: '14:30 CET',
      fullName: '',
      email: '',
      phone: '',
      notes: '',
    },
  });

  useEffect(() => {
    setActiveTheme('emerald-salon');
    setActiveSectionNumber('07');
  }, [setActiveTheme, setActiveSectionNumber]);

  const selectedType = watch('type');
  const selectedLocation = watch('location');
  const selectedDate = watch('date');
  const selectedTime = watch('timeSlot');

  const onSubmit = (data: AppointmentFormData) => {
    console.log('Salon appointment confirmed:', data);
    setIsSubmitted(true);
  };

  const accordionServices = [
    {
      id: 'viewing',
      title: 'PRIVATE COLLECTION VIEWING',
      duration: '30–45 MIN',
      desc: 'An intimate presentation of our current collections inside a dedicated salon chamber with museum-calibrated spotlights.',
    },
    {
      id: 'bridal',
      title: 'BRIDAL & SOLITAIRE CONSULTATION',
      duration: '45–60 MIN',
      desc: 'Private exploration of tension-set diamond arches, solitaire mountings, and hand-sculpted wedding bands.',
    },
    {
      id: 'bespoke',
      title: 'BESPOKE CONSULTATION',
      duration: '60–90 MIN',
      desc: 'One-on-one session with our senior designer to draft original silhouettes, select loose mineral specimens, and test wax prototypes.',
    },
    {
      id: 'vault',
      title: 'HIGH JEWELLERY & VAULT VIEWING',
      duration: 'BY REQUEST',
      desc: 'Restricted access to unique one-of-one pieces, rare unheated Colombian emeralds, and historical archive commissions.',
    },
  ];

  return (
    <div className="w-full bg-[#0D2620] text-[#F1EDE5] pt-28 pb-40 overflow-hidden">
      {/* ====================================================
          APPOINTMENTS HERO (Space Grotesk Minimal Architecture)
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-28">
        <div className="border-b border-[#F1EDE5]/15 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
              SALON PRIVÉ // RESERVATIONS
            </span>
            <h1 className="font-['Space_Grotesk'] text-[52px] sm:text-[84px] lg:text-[112px] font-light uppercase leading-[0.9] tracking-[-0.03em]">
              See It <br />
              In Person.
            </h1>
          </div>

          <p className="font-['Space_Grotesk'] text-[15px] text-[#C4D6D1] max-w-sm text-left md:text-right">
            Jewellery responds to body heat and ambient motion. Experience the weight of gold before acquiring.
          </p>
        </div>

        {/* Salon Interior Photographic Stage */}
        <div className="relative w-full h-[520px] md:h-[680px] bg-[#081B16] overflow-hidden border border-[#F1EDE5]/15 shadow-2xl">
          <SafeImage
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1800&auto=format&fit=crop"
            alt="Dark luxury salon interior with smoked glass and brushed brass"
            luxuryLabel="Salon Interior"
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2620] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F1EDE5] bg-[#081B16]/85 px-4 py-2 border border-[#C7A66A]/30">
            SALON PRIVÉ NO. 12 // PLACE VENDÔME, PARIS
          </div>
        </div>
      </section>

      {/* ====================================================
          APPOINTMENT TYPES AS FULL-WIDTH ACCORDION ROWS
          ==================================================== */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 mb-36">
        <div className="border-b border-[#F1EDE5]/15 pb-4 mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C7A66A]">
            CONSULTATION FORMATS
          </span>
        </div>

        <div className="divide-y divide-[#F1EDE5]/10 border-y border-[#F1EDE5]/10">
          {accordionServices.map((srv) => {
            const isOpen = openRow === srv.id;
            return (
              <div key={srv.id} className="py-2">
                <div
                  onClick={() => setOpenRow(isOpen ? null : srv.id)}
                  className="py-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-['Bodoni_Moda'] text-[24px] sm:text-[34px] uppercase text-[#F1EDE5] group-hover:text-[#C7A66A] transition-colors">
                      {srv.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-8 mt-2 md:mt-0 font-mono text-[12px] text-[#C4D6D1]">
                    <span>{srv.duration}</span>
                    <span className="text-[#C7A66A] text-[18px]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className="pb-8 pt-2 max-w-2xl text-[14px] text-[#C4D6D1] leading-relaxed">
                    <p>{srv.desc}</p>
                    <button
                      onClick={() => {
                        setValue('type', srv.title);
                        const formEl = document.getElementById('reservation-flow');
                        formEl?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-luxury mt-4 text-[#F1EDE5] border-[#F1EDE5]/20"
                    >
                      SELECT THIS CONSULTATION ↓
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================
          5-STEP BOOKING FLOW
          ==================================================== */}
      <section id="reservation-flow" className="max-w-[1080px] mx-auto px-6 md:px-12">
        <div className="bg-[#081B16] border border-[#F1EDE5]/15 p-8 md:p-16 shadow-2xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="text-center pb-8 border-b border-[#F1EDE5]/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C7A66A] block mb-2">
                  CONFIDENTIAL RESERVATION
                </span>
                <h2 className="font-['Space_Grotesk'] text-[32px] sm:text-[42px] uppercase font-light">
                  Reserve Your Private Salon
                </h2>
              </div>

              {/* Step Tracker */}
              <div className="flex justify-between font-mono text-[11px] pb-6 border-b border-[#F1EDE5]/10">
                {['01 TYPE', '02 SALON', '03 CALENDAR', '04 GUEST'].map((step, idx) => (
                  <span
                    key={step}
                    className={
                      activeStep === idx + 1
                        ? 'text-[#C7A66A] font-bold border-b border-[#C7A66A] pb-1'
                        : 'text-[#84A39B]'
                    }
                  >
                    {step}
                  </span>
                ))}
              </div>

              {/* Step 1 */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    CONSULTATION SELECTED:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {accordionServices.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setValue('type', s.title)}
                        className={`p-4 text-left border text-[13px] font-['Space_Grotesk'] transition-colors ${
                          selectedType === s.title
                            ? 'border-[#C7A66A] bg-[#163D34] text-[#F1EDE5]'
                            : 'border-[#F1EDE5]/10 text-[#C4D6D1] hover:border-[#C7A66A]'
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    SELECT LOCATION:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Paris — Place Vendôme (12 Rue de la Paix)',
                      'Milan — Via Montenapoleone 18',
                      'Geneva — Quai des Bergues Suite',
                      'Virtual 4K Micro-Gem Concierge',
                    ].map((loc) => (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => setValue('location', loc)}
                        className={`p-4 text-left border text-[13px] font-['Space_Grotesk'] transition-colors ${
                          selectedLocation === loc
                            ? 'border-[#C7A66A] bg-[#163D34] text-[#F1EDE5]'
                            : 'border-[#F1EDE5]/10 text-[#C4D6D1] hover:border-[#C7A66A]'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    DATE & TIME PREFERENCE:
                  </span>
                  <div>
                    <input
                      type="date"
                      {...register('date')}
                      className="w-full bg-[#0D2620] border border-[#F1EDE5]/15 p-3 text-[#F1EDE5] font-mono outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['11:00 CET', '14:30 CET', '16:00 CET', '18:00 CET'].map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setValue('timeSlot', slot)}
                        className={`p-2.5 text-[11px] font-mono border text-center ${
                          selectedTime === slot
                            ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-bold'
                            : 'border-[#F1EDE5]/10 text-[#F1EDE5]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {activeStep === 4 && (
                <div className="space-y-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    GUEST CONTACT:
                  </span>
                  <div>
                    <input
                      type="text"
                      placeholder="FULL NAME *"
                      {...register('fullName')}
                      className="w-full bg-[#0D2620] border border-[#F1EDE5]/15 p-3 text-[#F1EDE5] font-['Space_Grotesk'] outline-none"
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-red-400 font-mono mt-1 block">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="EMAIL ADDRESS *"
                      {...register('email')}
                      className="w-full bg-[#0D2620] border border-[#F1EDE5]/15 p-3 text-[#F1EDE5] font-['Space_Grotesk'] outline-none"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 font-mono mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="TELEPHONE (OPTIONAL)"
                      {...register('phone')}
                      className="w-full bg-[#0D2620] border border-[#F1EDE5]/15 p-3 text-[#F1EDE5] font-['Space_Grotesk'] outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      placeholder="SPECIFIC PIECES OR GEMSTONES OF INTEREST..."
                      {...register('notes')}
                      className="w-full bg-[#0D2620] border border-[#F1EDE5]/15 p-3 text-[#F1EDE5] font-['Space_Grotesk'] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-between items-center pt-8 border-t border-[#F1EDE5]/10">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep((s) => s - 1)}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C4D6D1] hover:text-[#C7A66A]"
                  >
                    ← PREVIOUS STEP
                  </button>
                ) : (
                  <div />
                )}

                {activeStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep((s) => s + 1)}
                    className="btn-solid-luxury py-3 px-8 text-[11px]"
                  >
                    CONTINUE →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-solid-luxury py-3 px-8 text-[11px]"
                  >
                    TRANSMIT RESERVATION →
                  </button>
                )}
              </div>
            </form>
          ) : (
            /* Confirmation */
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full border border-[#C7A66A] flex items-center justify-center text-[#C7A66A] text-2xl">
                ✓
              </div>
              <h3 className="font-['Bodoni_Moda'] text-[32px] text-[#F1EDE5]">
                Salon Reservation Logged.
              </h3>
              <p className="font-['Space_Grotesk'] text-[14px] text-[#C4D6D1] max-w-md mx-auto leading-relaxed">
                Your private salon viewing request for {selectedType} at {selectedLocation} on {selectedDate} ({selectedTime}) has been recorded. Our head concierge will reach out discreetly to confirm arrival protocol.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-luxury inline-flex"
              >
                BOOK ANOTHER DATE →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
