import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Shield, AtSign } from 'lucide-react';
import HoneyButton from '../../../components/ui/HoneyButton';

export default function RegisterForm({ onRegister, onGoToLogin, playSound }) {
  const [formData, setFormData] = useState({ username: '', sponsor: '', name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username.trim()) {
      setError('Escolha um username.');
      playSound('error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem!');
      playSound('error');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      playSound('error');
      return;
    }

    const err = onRegister({
      username: formData.username.trim(),
      sponsor: formData.sponsor,
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (err) {
      setError(err);
    }
  };

  return (
    <div className="w-full animate-slide-left bg-black/40 p-6 rounded-[32px] border border-white/10 backdrop-blur-md">
      <h3 className="text-2xl font-black text-white mb-6">Cadastro</h3>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-2xl mb-4 font-bold animate-slide-up">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <AtSign size={18} />
          </div>
          <input 
            type="text" 
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="Username" 
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC83D] focus:bg-white/10 transition-all text-sm font-medium"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Shield size={18} />
          </div>
          <input 
            type="text" 
            name="sponsor"
            value={formData.sponsor}
            onChange={handleChange}
            placeholder="Patrocinador (Opcional)" 
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC83D] focus:bg-white/10 transition-all text-sm font-medium"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <User size={18} />
          </div>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome Completo" 
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC83D] focus:bg-white/10 transition-all text-sm font-medium"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Mail size={18} />
          </div>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Seu E-mail" 
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC83D] focus:bg-white/10 transition-all text-sm font-medium"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Lock size={18} />
          </div>
          <input 
            type={showPassword ? "text" : "password"} 
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Sua Senha" 
            className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC83D] focus:bg-white/10 transition-all text-sm font-medium"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Lock size={18} />
          </div>
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme a Senha" 
            className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC83D] focus:bg-white/10 transition-all text-sm font-medium"
          />
          <button 
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <HoneyButton type="submit" className="w-full py-3 mt-4 shadow-lg">
          Criar Conta
        </HoneyButton>
      </form>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <button 
          onClick={() => { playSound('pop'); onGoToLogin(); }}
          className="text-gray-400 text-sm font-bold w-full hover:text-white transition-colors"
        >
          Voltar ao Login
        </button>
      </div>
    </div>
  );
}
