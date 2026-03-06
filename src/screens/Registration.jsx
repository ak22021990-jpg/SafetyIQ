// src/screens/Registration.jsx
// LAUNCH SCREEN — first screen users see when app starts
import { useState } from 'react'
import { Camera } from 'lucide-react'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useSession } from '../context/SessionContext'
import { SCREENS } from '../constants/screens'

const TITLE_OPTIONS = [
  'VP Marketing',
  'VP Sales',
  'VP Operations',
  'VP Trust & Safety',
  'VP Product',
  'VP Engineering',
  'Head of Risk & Compliance',
  'Director Content Policy',
  'Director Operations',
  'Manager Operations',
  'Manager Trust & Safety',
  'Product Lead',
  'C-Suite / Executive',
  'Founder / CEO',
  'Other',
]

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.company.trim()) errors.company = 'Company is required'
  if (!form.title) errors.title = 'Please select your title'
  if (form.title === 'Other' && !form.titleOther.trim())
    errors.titleOther = 'Please specify your title'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email address'
  if (!form.consent) errors.consent = 'Please accept to continue'
  return errors
}

export default function Registration({ navigate }) {
  const { registerPlayer } = useSession()

  const [form, setForm] = useState({
    name: '',
    company: '',
    title: '',
    titleOther: '',
    email: '',
    consent: false,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (field) => (e) =>
    setForm(prev => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    const playerData = {
      name: form.name.trim(),
      company: form.company.trim(),
      title: form.title === 'Other' ? form.titleOther.trim() : form.title,
      email: form.email.trim(),
      consent: true,
    }
    registerPlayer(playerData)
    navigate(SCREENS.HOME)
  }

  const canSubmit = form.consent && !submitting
  const formValid = Object.keys(validate(form)).length === 0

  const handleSelfie = () => {
    if (!formValid) return
    const playerData = {
      name:    form.name.trim(),
      company: form.company.trim(),
      title:   form.title === 'Other' ? form.titleOther.trim() : form.title,
      email:   form.email.trim(),
      consent: true,
    }
    registerPlayer(playerData)
    navigate(SCREENS.SELFIE, null, SCREENS.HOME)
  }

  return (
    <ScreenWrapper>
      <div className="w-full h-full flex flex-col items-center overflow-y-auto py-8 px-4">

        {/* Spacer pushes content to center when there's room; collapses when scrolling */}
        <div className="flex-1" style={{ minHeight: '16px', maxHeight: '60px' }} />

        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-mono uppercase tracking-widest text-gold mb-2"
            style={{ fontSize: '9px', letterSpacing: '3px' }}>
            Sutherland · Trust &amp; Safety Practice
          </p>
          <h1 className="font-heading font-extrabold text-text-primary" style={{ fontSize: '44px', lineHeight: '1.05' }}>
            Signal &amp; Noise
          </h1>
          <p className="font-mono text-body-s text-text-secondary mt-2">
            Four intelligence games. One score. How sharp are you?
          </p>
        </div>

        {/* Registration card */}
        <div
          className="w-full"
          style={{
            maxWidth: '660px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '44px 48px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
          }}
        >
          <div className="mb-6">
            <h2 className="font-heading font-bold text-midnight" style={{ fontSize: '20px' }}>
              Hello! Would you like to tell more about you?
            </h2>
            <p className="font-mono text-body-s text-slate-500 mt-1">
              Your results will be saved and ranked on the leaderboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">

              {/* Row 1: Name + Company */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Alexandra Chen"
                  error={errors.name}
                  required
                  autoComplete="name"
                />
                <Input
                  label="Company"
                  value={form.company}
                  onChange={set('company')}
                  placeholder="Veritas Corp"
                  error={errors.company}
                  required
                  autoComplete="organization"
                />
              </div>

              {/* Row 2: Title + Email */}
              <div className="grid grid-cols-2 gap-4">
                {/* Title dropdown */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="title-select"
                    className="font-mono uppercase tracking-widest text-slate-600"
                    style={{ fontSize: '9px', letterSpacing: '2px' }}
                  >
                    Title<span className="text-gold ml-1">*</span>
                  </label>
                  <select
                    id="title-select"
                    value={form.title}
                    onChange={set('title')}
                    required
                    style={{ background: '#FFFFFF' }}
                    className="w-full border border-surface-border focus:border-midnight font-heading text-body-m text-midnight px-4 py-3 outline-none transition-all duration-150 rounded-[8px] appearance-none cursor-pointer focus:shadow-[0_0_0_3px_rgba(15,23,42,0.08)]"
                  >
                    <option value="" className="bg-white">Select title</option>
                    {TITLE_OPTIONS.map(opt => (
                      <option key={opt} value={opt} className="bg-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.title && (
                    <p className="font-mono text-red-signal mt-0.5" style={{ fontSize: '9px' }} role="alert">
                      {errors.title}
                    </p>
                  )}
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="a.chen@veritas.com"
                  error={errors.email}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Conditional "Other" title input — spans full width */}
              {form.title === 'Other' && (
                <Input
                  label="Specify Title"
                  value={form.titleOther}
                  onChange={set('titleOther')}
                  placeholder="Your title"
                  error={errors.titleOther}
                  required
                />
              )}

              {/* Consent checkbox */}
              <div className="mt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={set('consent')}
                    className="mt-0.5 w-4 h-4 cursor-pointer shrink-0 accent-gold"
                    required
                  />
                  <span className="font-mono text-body-s text-slate-600 group-hover:text-midnight transition-colors">
                    I&apos;m happy for my information to be stored for business purposes
                    in accordance with Sutherland&apos;s data policy.
                  </span>
                </label>
                {errors.consent && (
                  <p className="font-mono text-red-signal mt-1 ml-7" style={{ fontSize: '9px' }} role="alert">
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* CTA */}
              <Button
                type="submit"
                variant="primary"
                disabled={!canSubmit}
                showArrow
                className="w-full justify-center mt-2"
              >
                Create My Safety IQ Profile
              </Button>

              <button
                type="button"
                onClick={handleSelfie}
                disabled={!formValid}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  width: '100%', padding: '11px',
                  background: 'transparent',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  cursor: formValid ? 'pointer' : 'not-allowed',
                  opacity: formValid ? 1 : 0.4,
                  fontFamily: 'monospace', fontSize: '10px', letterSpacing: '2px',
                  textTransform: 'uppercase', fontWeight: 700,
                  color: '#475569',
                }}
              >
                <Camera size={13} />
                Take a Selfie
              </button>

            </div>
          </form>
        </div>

        {/* Bottom spacer */}
        <div className="flex-1" style={{ minHeight: '16px', maxHeight: '60px' }} />
      </div>
    </ScreenWrapper>
  )
}
