'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { X, Mail, Lock, User, KeyRound, Loader2 } from 'lucide-react';
import { signInWithEmailPassword, signUpWithEmailPassword, verifyOtp, resetPassword, signInWithGoogle } from '@/lib/actions/auth.actions';
import toast from 'react-hot-toast';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
});

const resetSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export default function AuthModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalParam = searchParams.get('modal');
  const t = useTranslations('auth');

  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'signin' | 'signup' | 'forgot' | 'otp'>('signin');
  const [loading, setLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (modalParam === 'signin') {
      setView('signin');
      setIsOpen(true);
    } else if (modalParam === 'signup') {
      setView('signup');
      setIsOpen(true);
    }
  }, [modalParam]);

  const closeModal = () => {
    setIsOpen(false);
    // Remove query param
    const newUrl = window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  };

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    const res = await signInWithEmailPassword(formData);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Signed in successfully!');
      closeModal();
      router.push('/dashboard');
    }
  };

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('fullName', values.fullName);

    const res = await signUpWithEmailPassword(formData);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else if (res?.needsOtp) {
      setOtpEmail(res.email!);
      setView('otp');
      toast.success('Registration successful! Please check your email for the OTP.');
    }
  };

  const handleReset = async (values: z.infer<typeof resetSchema>) => {
    setLoading(true);
    const res = await resetPassword(values.email);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Password reset link sent to your email.');
      setView('signin');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otpValues[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newValues = [...otpValues];
    for (let i = 0; i < pastedData.length; i++) {
      newValues[i] = pastedData[i];
    }
    setOtpValues(newValues);
    
    const focusIndex = Math.min(pastedData.length, 5);
    const nextInput = document.getElementById(`otp-${focusIndex}`);
    nextInput?.focus();
  };

  const submitOtp = async () => {
    const otp = otpValues.join('');
    if (otp.length < 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    const res = await verifyOtp(otpEmail, otp);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Email verified successfully!');
      closeModal();
      router.push('/dashboard');
    }
  };

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 5) score++;
    if (pwd.length > 8) score++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    return score; // 0, 1, 2, 3
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-[#07101f]/80 backdrop-blur-md"
        onClick={closeModal}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[900px] h-full max-h-[600px] bg-[var(--bg-section)] border border-[var(--border-c)] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-up">
        
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Panel (Branding) */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-primary-light/20 to-primary/5 border-r border-[var(--border-c)] p-10 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-light/20 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                E
              </div>
              <span className="font-poppins font-bold text-2xl tracking-tight text-white">EcoMate</span>
            </div>
            
            <h2 className="text-3xl font-poppins font-extrabold text-white mb-4">
              Scale Your E-Commerce Business.
            </h2>
            <p className="text-[var(--text-sub)] mb-8">
              Join thousands of Algerian merchants managing everything in one powerful platform.
            </p>

            <ul className="space-y-4">
              {[
                'Intelligent AI Chatbot automation',
                'Native Chargily Pay integration',
                'Real-time Yalidine tracking',
                'Order fulfillment pipeline'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[var(--text-muted)]">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative z-10 flex items-center gap-3 bg-[var(--bg-body)]/50 backdrop-blur border border-[var(--border-c)] rounded-xl p-4 w-max">
             <div className="text-2xl font-bold text-white">⚡</div>
             <div className="text-sm text-[var(--text-muted)] leading-tight">
               Instant<br/>Activation
             </div>
          </div>
        </div>

        {/* Right Panel (Forms) */}
        <div className="flex-1 p-10 flex flex-col justify-center bg-[var(--bg-body)] relative">
          {view === 'signin' && (
            <div className="w-full max-w-sm mx-auto animate-fade-up">
              <h3 className="font-poppins text-2xl font-bold mb-2">Welcome Back</h3>
              <p className="text-[var(--text-sub)] text-sm mb-6">Sign in to orchestrate your business.</p>
              
              <button 
                onClick={() => signInWithGoogle()}
                className="w-full btn-ghost flex items-center justify-center gap-3 mb-6 hover:bg-white/5 disabled:opacity-50"
                disabled={loading}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 bg-white rounded-full p-0.5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                {t('google')}
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-[var(--border-c)]" />
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Or email</span>
                <div className="h-[1px] flex-1 bg-[var(--border-c)]" />
              </div>

              <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      {...signInForm.register('email')}
                      type="text" 
                      placeholder="Email Address" 
                      className="w-full bg-white/5 border border-[var(--border-c)] rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary-light transition-colors"
                    />
                  </div>
                  {signInForm.formState.errors.email && (
                    <p className="text-red-400 text-xs mt-1">{signInForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      {...signInForm.register('password')}
                      type="password" 
                      placeholder="Password" 
                      className="w-full bg-white/5 border border-[var(--border-c)] rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary-light transition-colors"
                    />
                  </div>
                  {signInForm.formState.errors.password && (
                    <p className="text-red-400 text-xs mt-1">{signInForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={() => setView('forgot')} className="text-xs text-primary-light hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center py-3">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('signIn')}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
                Don&apos;t have an account?{' '}
                <button onClick={() => setView('signup')} className="text-white hover:text-primary-light font-medium transition-colors">
                  Sign up for free
                </button>
              </div>
            </div>
          )}

          {view === 'signup' && (
            <div className="w-full max-w-sm mx-auto animate-fade-up">
              <h3 className="font-poppins text-2xl font-bold mb-2">Join EcoMate</h3>
              <p className="text-[var(--text-sub)] text-sm mb-6">Create your EcoMate account.</p>
              
              <button 
                onClick={() => signInWithGoogle()}
                className="w-full btn-ghost flex items-center justify-center gap-3 mb-6 hover:bg-white/5 disabled:opacity-50"
                disabled={loading}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 bg-white rounded-full p-0.5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                {t('google')}
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] flex-1 bg-[var(--border-c)]" />
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Or email</span>
                <div className="h-[1px] flex-1 bg-[var(--border-c)]" />
              </div>

              <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                <div>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      {...signUpForm.register('fullName')}
                      type="text" 
                      placeholder="Full Name/Business Name" 
                      className="w-full bg-white/5 border border-[var(--border-c)] rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary-light transition-colors"
                    />
                  </div>
                  {signUpForm.formState.errors.fullName && (
                    <p className="text-red-400 text-xs mt-1">{signUpForm.formState.errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      {...signUpForm.register('email')}
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-white/5 border border-[var(--border-c)] rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary-light transition-colors"
                    />
                  </div>
                  {signUpForm.formState.errors.email && (
                    <p className="text-red-400 text-xs mt-1">{signUpForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      {...signUpForm.register('password')}
                      type="password" 
                      placeholder="Create Password" 
                      className="w-full bg-white/5 border border-[var(--border-c)] rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary-light transition-colors"
                    />
                  </div>
                  
                  {/* Password Strength Meter */}
                  <div className="flex gap-1 mt-2 px-1">
                    {(() => {
                      // eslint-disable-next-line react-hooks/incompatible-library
                      const pwd = signUpForm.watch('password') || '';
                      const score = getPasswordStrength(pwd);
                      return [1, 2, 3].map((level) => {
                        let bgClass = 'bg-white/10';
                        if (score >= level) {
                          if (score === 1) bgClass = 'bg-red-400';
                          else if (score === 2) bgClass = 'bg-yellow-400';
                          else bgClass = 'bg-green-400';
                        }
                        return (
                          <div key={level} className={`h-1 flex-1 rounded-full transition-colors ${bgClass}`} />
                        );
                      });
                    })()}
                  </div>
                  {signUpForm.formState.errors.password && (
                    <p className="text-red-400 text-xs mt-1">{signUpForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input 
                    {...signUpForm.register('terms')}
                    type="checkbox" 
                    id="terms"
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-xs text-[var(--text-muted)]">
                    I agree to the Terms of Service and Privacy Policy. I will use this platform responsibly.
                  </label>
                </div>
                  {signUpForm.formState.errors.terms && (
                    <p className="text-red-400 text-xs mt-1">{signUpForm.formState.errors.terms.message}</p>
                  )}

                <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center py-3">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('signUp')}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
                Already have an account?{' '}
                <button onClick={() => setView('signin')} className="text-white hover:text-primary-light font-medium transition-colors">
                  Sign in
                </button>
              </div>
            </div>
          )}

          {view === 'otp' && (
            <div className="w-full max-w-sm mx-auto animate-fade-up text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <KeyRound className="w-8 h-8 text-primary-light" />
              </div>
              <h3 className="font-poppins text-2xl font-bold mb-2">Check your email</h3>
              <p className="text-[var(--text-sub)] text-sm mb-8">
                We&apos;ve sent a 6-digit confirmation code to<br />
                <span className="text-white font-medium">{otpEmail}</span>
              </p>

              <div className="flex justify-between gap-2 mb-8" onPaste={handlePaste}>
                {otpValues.map((val, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-12 h-14 bg-white/5 border border-[var(--border-c)] rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:border-primary-light transition-colors"
                  />
                ))}
              </div>

              <button 
                onClick={submitOtp} 
                disabled={loading} 
                className="w-full btn-primary flex justify-center py-3 mb-6"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Code'}
              </button>
              
              <button onClick={() => setView('signup')} className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                Back to sign up
              </button>
            </div>
          )}

          {view === 'forgot' && (
            <div className="w-full max-w-sm mx-auto animate-fade-up">
              <button onClick={() => setView('signin')} className="text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-6 flex items-center gap-1">
                ← Back
              </button>
              <h3 className="font-poppins text-2xl font-bold mb-2">Reset Password</h3>
              <p className="text-[var(--text-sub)] text-sm mb-6">Enter your email and we&apos;ll send you a link to reset your password.</p>
              
              <form onSubmit={resetForm.handleSubmit(handleReset)} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      {...resetForm.register('email')}
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-white/5 border border-[var(--border-c)] rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary-light transition-colors"
                    />
                  </div>
                  {resetForm.formState.errors.email && (
                    <p className="text-red-400 text-xs mt-1">{resetForm.formState.errors.email.message}</p>
                  )}
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center py-3">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
