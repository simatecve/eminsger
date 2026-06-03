import React, { useState } from 'react';
import { clearInsforgeSession, insforge } from '../lib/insforge';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    clearInsforgeSession();

    const { data, error } = await insforge.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas. Por favor intente de nuevo.');
      setLoading(false);
    } else {
      const anyData = data as any;
      const accessToken =
        anyData?.accessToken ??
        anyData?.access_token ??
        anyData?.token ??
        anyData?.session?.access_token ??
        anyData?.session?.accessToken ??
        anyData?.session?.token;
      const user = anyData?.user ?? anyData?.session?.user ?? anyData?.session?.data?.user;
      const tokenManager = (insforge as any).tokenManager;
      const accessTokenFromClient =
        tokenManager?.accessToken ?? tokenManager?.getAccessToken?.() ?? tokenManager?.getToken?.();
      const userFromClient = tokenManager?.user ?? tokenManager?.getUser?.();
      const finalAccessToken = typeof accessToken === 'string' ? accessToken : accessTokenFromClient;
      const finalUser = user ?? userFromClient;

      if (typeof finalAccessToken === 'string' && finalUser) {
        try {
          window.localStorage.setItem(
            'insforge_session',
            JSON.stringify({ accessToken: finalAccessToken, user: finalUser }),
          );
        } catch {
        }
        insforge.setAccessToken(finalAccessToken);
        (insforge as any).tokenManager?.setUser?.(finalUser);
      }
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-3xl text-carbon mb-2">Panel de Administración</h1>
          <p className="text-slate-500">Ingrese sus credenciales para gestionar los proyectos.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan focus:border-transparent outline-none transition-all text-carbon"
                placeholder="admin@emin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan focus:border-transparent outline-none transition-all text-carbon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-hyundai-navy hover:bg-carbon text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Iniciar Sesión
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
