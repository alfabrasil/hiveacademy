import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import HoneyButton from '../../../components/ui/HoneyButton';

export default function LoginForm({ onLogin, onGoToRegister, playSound }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Preencha todos os campos.');
      playSound('error');
      return;
    }

    const err = onLogin(email, password);
    if (err) {
      setError(err);
    }
  };

  return (
    <div className="w-full animate-slide-left bg-black/40 p-6 rounded-[32px] border border-white/10 backdrop-blur-md">
      <h3 className="text-2xl font-black text-white mb-6">Login</h3>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-2xl mb-4 font-bold animate-slide-up">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Mail size={20} />
          </div>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu E-mail" 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC83D] focus:bg-white/10 transition-all font-medium"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Lock size={20} />
          </div>
          <input 
            type={showPassword ? "text" : "password"} 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua Senha" 
            className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC83D] focus:bg-white/10 transition-all font-medium"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <div className="flex justify-end">
          <button type="button" onClick={() => playSound('pop')} className="text-xs text-[#FFC83D] font-bold hover:underline">
            Recuperar senha?
          </button>
        </div>

        <HoneyButton type="submit" className="w-full py-3 mt-2 shadow-lg">
          Entrar
        </HoneyButton>
      </form>
      
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm font-medium">Ainda não tem conta?</p>
        <button 
          onClick={() => { playSound('pop'); onGoToRegister(); }}
          className="mt-2 text-[#FFC83D] font-bold flex items-center justify-center gap-2 w-full hover:bg-white/5 py-2 rounded-xl transition-colors"
        >
          Cadastre-se <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
