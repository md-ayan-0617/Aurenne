import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUiStore } from '../../store/useUiStore';

const appointmentSchema = z.object({
  type: z.string().min(1, 'Please select consultation type'),
  location: z.string().min(1, 'Please select a salon location'),
  date: z.string().min(1, 'Please select an appointment date'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export const AppointmentDrawer: React.FC = () => {
  const { isAppointmentDrawerOpen, closeAppointmentDrawer, appointmentPrefill, setCursor, resetCursor } = useUiStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      type: appointmentPrefill.service || 'Private Collection Viewing',
      location: 'Paris — Place Vendôme',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: '14:30 CET',
      fullName: '',
      email: '',
      phone: '',
      notes: appointmentPrefill.productName ? `Inquiring about ${appointmentPrefill.productName}` : '',
    },
  });

  useEffect(() => {
    if (appointmentPrefill.service) setValue('type', appointmentPrefill.service);
    if (appointmentPrefill.productName) {
      setValue('notes', `Inquiring about ${appointmentPrefill.productName}`);
    }
  }, [appointmentPrefill, setValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAppointmentDrawerOpen) closeAppointmentDrawer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAppointmentDrawerOpen, closeAppointmentDrawer]);

  if (!isAppointmentDrawerOpen) return null;

  const selectedType = watch('type');
  const selectedLocation = watch('location');
  const selectedDate = watch('date');
  const selectedTime = watch('timeSlot');

  const onSubmit = (data: AppointmentFormData) => {
    console.log('Private appointment confirmed:', data);
    setBookingConfirmed(true);
  };

  const handleClose = () => {
    closeAppointmentDrawer();
    setTimeout(() => {
      setBookingConfirmed(false);
      setCurrentStep(1);
      reset();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Private Appointment Booking"
      className="fixed inset-0 z-[9998] flex justify-end"
    >
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#08090A]/75 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="relative z-10 w-full max-w-[560px] h-full bg-[#0D2620] border-l border-[rgba(199,166,106,0.2)] text-[#F1EDE5] flex flex-col justify-between shadow-2xl animate-fade-in overflow-y-auto">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-[rgba(199,166,106,0.15)] flex items-center justify-between bg-[#081B16]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] block">
              SALON PRIVÉ // AURENNE
            </span>
            <h3 className="font-['Bodoni_Moda'] text-[20px] text-[#F1EDE5]">
              Private Salon Appointment
            </h3>
          </div>

          <button
            onClick={handleClose}
            onMouseEnter={() => setCursor('default', 'CLOSE')}
            onMouseLeave={resetCursor}
            className="text-[11px] uppercase tracking-[0.2em] hover:text-[#C7A66A] transition-colors"
          >
            CLOSE
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-6 md:p-8">
          {!bookingConfirmed ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step Tracker */}
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(255,255,255,0.08)]">
                {['TYPE', 'LOCATION', 'DATE & TIME', 'DETAILS'].map((label, idx) => (
                  <div key={label} className="flex flex-col items-center">
                    <span
                      className={`font-mono text-[11px] tracking-[0.1em] ${
                        currentStep === idx + 1
                          ? 'text-[#C7A66A] font-bold'
                          : currentStep > idx + 1
                          ? 'text-[#F1EDE5]'
                          : 'text-[#84A39B]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="hidden sm:inline text-[9px] uppercase tracking-[0.15em] text-[#84A39B]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Appointment Type */}
              {currentStep === 1 && (
                <div className="space-y-4 pt-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    SELECT CONSULTATION TYPE:
                  </span>
                  {[
                    {
                      name: 'Private Collection Viewing',
                      time: '30–45 min',
                      desc: 'Curated presentation of current collections under dedicated salon lighting.',
                    },
                    {
                      name: 'Bespoke Consultation',
                      time: '60–90 min',
                      desc: 'One-on-one session with a Maison designer to develop custom stone & metal commissions.',
                    },
                    {
                      name: 'Bridal & Solitaire Consultation',
                      time: '45–60 min',
                      desc: 'Tension-set engagement arches, solitaire selections, and fitted wedding bands.',
                    },
                    {
                      name: 'High Jewellery Viewing',
                      time: 'By Request',
                      desc: 'Private vault access to rare unheated emeralds, sapphires and unique pieces.',
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setValue('type', item.name)}
                      className={`p-4 border transition-all cursor-pointer ${
                        selectedType === item.name
                          ? 'border-[#C7A66A] bg-[#163D34]'
                          : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(199,166,106,0.5)] bg-[#0A1F19]'
                      }`}
                    >
                      <div className="flex justify-between items-baseline">
                        <span className="font-['Bodoni_Moda'] text-[16px] text-[#F1EDE5]">
                          {item.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#C7A66A]">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#C4D6D1] mt-1 font-['Space_Grotesk'] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Salon Location */}
              {currentStep === 2 && (
                <div className="space-y-4 pt-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    SELECT PRIVATE SALON:
                  </span>
                  {[
                    {
                      city: 'Paris — Place Vendôme',
                      address: '12 Rue de la Paix, 75001 Paris',
                      atmosphere: 'Private 19th-century salon overlooking the square.',
                    },
                    {
                      city: 'Milan — Quadrilatero della Moda',
                      address: 'Via Montenapoleone 18, 20121 Milano',
                      atmosphere: 'Contemporary architectural viewing room with smoked glass.',
                    },
                    {
                      city: 'Geneva — Quai des Bergues',
                      address: 'Private Suite by appointment',
                      atmosphere: 'Private consultation overlooking Lake Geneva.',
                    },
                    {
                      city: 'Virtual Private Concierge',
                      address: 'Secure 4K Macro Video Stream',
                      atmosphere: 'High-definition microscopic gemstone viewing streamed globally.',
                    },
                  ].map((loc) => (
                    <div
                      key={loc.city}
                      onClick={() => setValue('location', loc.city)}
                      className={`p-4 border transition-all cursor-pointer ${
                        selectedLocation === loc.city
                          ? 'border-[#C7A66A] bg-[#163D34]'
                          : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(199,166,106,0.5)] bg-[#0A1F19]'
                      }`}
                    >
                      <span className="font-['Bodoni_Moda'] text-[16px] text-[#F1EDE5] block">
                        {loc.city}
                      </span>
                      <span className="text-[11px] font-mono text-[#C7A66A] block mt-0.5">
                        {loc.address}
                      </span>
                      <p className="text-[12px] text-[#C4D6D1] mt-1 font-['Space_Grotesk']">
                        {loc.atmosphere}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Date & Time */}
              {currentStep === 3 && (
                <div className="space-y-6 pt-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    SELECT DATE & TIME:
                  </span>

                  <div>
                    <label className="luxury-label">PREFERRED DATE</label>
                    <input
                      type="date"
                      {...register('date')}
                      className="w-full bg-[#0A1F19] border border-[rgba(255,255,255,0.12)] p-3 text-[#F1EDE5] font-mono outline-none focus:border-[#C7A66A]"
                    />
                    {errors.date && (
                      <span className="text-[11px] text-red-400 mt-1 block font-mono">
                        {errors.date.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="luxury-label">TIME SLOT</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {['11:00 CET', '14:30 CET', '16:00 CET', '18:30 CET'].map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setValue('timeSlot', slot)}
                          className={`p-2.5 text-[11px] font-mono border text-center transition-colors ${
                            selectedTime === slot
                              ? 'border-[#C7A66A] bg-[#C7A66A] text-[#08090A] font-bold'
                              : 'border-[rgba(255,255,255,0.1)] text-[#F1EDE5] hover:border-[#C7A66A]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Details & Inquiries */}
              {currentStep === 4 && (
                <div className="space-y-4 pt-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] block">
                    GUEST DETAILS:
                  </span>

                  <div>
                    <label className="luxury-label">FULL NAME *</label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      {...register('fullName')}
                      className="w-full bg-[#0A1F19] border border-[rgba(255,255,255,0.12)] p-3 text-[#F1EDE5] font-['Space_Grotesk'] outline-none focus:border-[#C7A66A]"
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-red-400 mt-1 block font-mono">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="luxury-label">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      placeholder="eleanor@example.com"
                      {...register('email')}
                      className="w-full bg-[#0A1F19] border border-[rgba(255,255,255,0.12)] p-3 text-[#F1EDE5] font-['Space_Grotesk'] outline-none focus:border-[#C7A66A]"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 mt-1 block font-mono">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="luxury-label">TELEPHONE (OPTIONAL)</label>
                    <input
                      type="tel"
                      placeholder="+33 6 00 00 00 00"
                      {...register('phone')}
                      className="w-full bg-[#0A1F19] border border-[rgba(255,255,255,0.12)] p-3 text-[#F1EDE5] font-['Space_Grotesk'] outline-none focus:border-[#C7A66A]"
                    />
                  </div>

                  <div>
                    <label className="luxury-label">OBJECT OF INTEREST / NOTES</label>
                    <textarea
                      rows={3}
                      placeholder="Any specific gemstones, carat weights, or pieces you wish prepared..."
                      {...register('notes')}
                      className="w-full bg-[#0A1F19] border border-[rgba(255,255,255,0.12)] p-3 text-[#F1EDE5] font-['Space_Grotesk'] outline-none focus:border-[#C7A66A]"
                    />
                  </div>
                </div>
              )}

              {/* Step Navigation Actions */}
              <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="text-[11px] uppercase tracking-[0.2em] text-[#C4D6D1] hover:text-[#C7A66A]"
                  >
                    ← BACK
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s + 1)}
                    className="btn-solid-luxury py-2.5 px-6 text-[11px]"
                  >
                    CONTINUE →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-solid-luxury py-2.5 px-6 text-[11px]"
                  >
                    CONFIRM RESERVATION →
                  </button>
                )}
              </div>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full border border-[#C7A66A] flex items-center justify-center text-[#C7A66A]">
                ✓
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C7A66A] block mb-2">
                  RESERVATION CONFIRMED
                </span>
                <h3 className="font-['Bodoni_Moda'] text-[28px] text-[#F1EDE5]">
                  We look forward to welcoming you.
                </h3>
              </div>

              <div className="p-6 bg-[#081B16] border border-[rgba(199,166,106,0.2)] text-left space-y-2 font-mono text-[12px]">
                <div className="flex justify-between text-[#84A39B]">
                  <span>CONSULTATION:</span>
                  <span className="text-[#F1EDE5]">{selectedType}</span>
                </div>
                <div className="flex justify-between text-[#84A39B]">
                  <span>SALON:</span>
                  <span className="text-[#F1EDE5]">{selectedLocation}</span>
                </div>
                <div className="flex justify-between text-[#84A39B]">
                  <span>DATE & TIME:</span>
                  <span className="text-[#C7A66A]">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between text-[#84A39B] pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <span>CONFIRMATION REF:</span>
                  <span className="text-[#C7A66A]">AUR-2026-{(Math.random() * 10000 | 0)}</span>
                </div>
              </div>

              <p className="text-[12px] text-[#C4D6D1] leading-relaxed">
                A private confirmation along with salon access directions has been dispatched to your email.
              </p>

              <button
                onClick={handleClose}
                className="btn-luxury inline-flex"
              >
                RETURN TO GALLERY →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
