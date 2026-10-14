import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

export default function LoginScreen({ darkMode, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    // Não coletar, armazenar ou transmitir credenciais sem um serviço de autenticação.
    setMessage('A tela de login está pronta. A autenticação ainda precisa ser implementada no Spring Boot antes de permitir o acesso por conta.');
    setPassword('');
  };

  return (
    <main className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#20212C] text-white' : 'bg-[#F4F7FD] text-[#000112]'}`}>
      <header className={`px-5 sm:px-10 py-5 border-b flex justify-between items-center ${darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white border-[#E4EBFA]'}`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-[3px] h-7 items-stretch" aria-hidden="true">
            <span className="w-2 rounded bg-[#635FC7]"/><span className="w-2 rounded bg-[#635FC7] opacity-75"/><span className="w-2 rounded bg-[#635FC7] opacity-50"/>
          </div>
          <span className="font-extrabold text-2xl tracking-wide">kanban</span>
        </div>
        <button onClick={onBack} type="button" className="flex items-center gap-2 text-sm font-bold text-[#828FA3] hover:text-[#635FC7] transition-colors">
          <ArrowLeft size={18} /> Voltar ao quadro
        </button>
      </header>
      <section className="flex flex-1 items-center justify-center px-4 py-12">
        <div className={`w-full max-w-md rounded-2xl p-7 sm:p-10 shadow-xl border ${darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white border-[#E4EBFA]'}`}>
          <div className="w-14 h-14 mb-6 rounded-2xl bg-[#635FC7]/10 flex items-center justify-center text-[#635FC7]"><LockKeyhole size={26}/></div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Acesse sua conta</h1>
          <p className="text-[#828FA3] text-sm leading-relaxed mb-7">Entre para gerenciar seus quadros e tarefas no TaskFlow.</p>
          <form onSubmit={submit} className="space-y-5">
            <label className="block text-xs font-bold text-[#828FA3]">
              E-mail
              <div className="relative mt-2">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#828FA3]" />
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username" placeholder="seuemail@exemplo.com"
                  className={`w-full py-3 pl-11 pr-3 rounded-lg border outline-none focus:border-[#635FC7] text-sm ${darkMode ? 'bg-[#20212C] border-[#3E3F4E] text-white' : 'bg-white border-[#E4EBFA] text-[#000112]'}`}/>
              </div>
            </label>
            <label className="block text-xs font-bold text-[#828FA3]">
              Senha
              <div className="relative mt-2">
                <LockKeyhole size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#828FA3]" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" placeholder="Digite sua senha"
                  className={`w-full py-3 pl-11 pr-12 rounded-lg border outline-none focus:border-[#635FC7] text-sm ${darkMode ? 'bg-[#20212C] border-[#3E3F4E] text-white' : 'bg-white border-[#E4EBFA] text-[#000112]'}`}/>
                <button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?'Ocultar senha':'Mostrar senha'} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828FA3] hover:text-[#635FC7]">
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </label>
            <button type="submit" className="w-full bg-[#635FC7] hover:bg-[#A8A4FF] transition-colors text-white font-bold rounded-full py-3.5">Entrar</button>
          </form>
          {message && <p role="status" className={`mt-5 text-sm p-4 rounded-lg border leading-relaxed ${darkMode ? 'border-[#3E3F4E] bg-[#20212C] text-[#D4D1FF]' : 'border-[#E4EBFA] bg-[#F4F7FD] text-[#635FC7]'}`}>{message}</p>}
          <div className="mt-7 flex items-start gap-2 text-xs text-[#828FA3] leading-relaxed"><ShieldCheck size={18} className="shrink-0"/><p>Prévia visual: este formulário não envia nem salva suas credenciais. A autenticação do servidor ainda será implementada.</p></div>
        </div>
      </section>
    </main>
  );
}
