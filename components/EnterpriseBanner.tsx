'use client';

import { motion } from 'framer-motion';
import { Link } from '@/lib/router-shim';
import { GlitchText } from './ui/glitch-text';
import { MagneticButton } from './ui/magnetic-button';
import { SpotlightCard } from './ui/spotlight-card';
import { Building2, ArrowRight, Shield, Zap } from 'lucide-react';

export function EnterpriseBanner() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SpotlightCard spotlightColor="rgba(230, 0, 0, 0.2)">
            <div className="relative p-8 md:p-12">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #E60000 0px, #E60000 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #E60000 0px, #E60000 1px, transparent 1px, transparent 20px)',
                }}></div>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[#E60000]/10 border border-[#E60000]/20">
                    <Building2 className="w-4 h-4 text-[#E60000]" />
                    <span className="text-sm text-[#E60000] font-mono uppercase tracking-wider">
                      Enterprise Solutions
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                    Для холдингов и <br className="hidden md:block" />
                    <GlitchText text="крупного бизнеса" className="text-[#E60000]" />
                  </h2>

                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
                    Корпоративная инфраструктура CRM с выделенной поддержкой, 
                    безлимитными интеграциями и SLA-гарантиями 99.99%
                  </p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="w-10 h-10 rounded-lg bg-[#E60000]/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-[#E60000]" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          Безопасность
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          SSO + 2FA
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="w-10 h-10 rounded-lg bg-[#E60000]/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-[#E60000]" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          Uptime
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          99.99% SLA
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="w-10 h-10 rounded-lg bg-[#E60000]/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-[#E60000]" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          Масштаб
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          5000+ users
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/enterprise">
                      <MagneticButton className="bg-[#E60000] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#cc0000] transition-colors inline-flex items-center gap-2">
                        Узнать подробнее <ArrowRight className="w-5 h-5" />
                      </MagneticButton>
                    </Link>
                    <Link to="/calculator-amocrm">
                      <MagneticButton className="bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10">
                        Расчет стоимости
                      </MagneticButton>
                    </Link>
                  </div>
                </div>

                {/* Side Stats */}
                <div className="flex-shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-6">
                  <div className="text-center lg:text-left">
                    <div className="text-4xl md:text-5xl font-bold text-[#E60000] mb-1">
                      850+
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Пользователей в<br />крупнейшем проекте
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl md:text-5xl font-bold text-[#E60000] mb-1">
                      24/7
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Dedicated<br />support team
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
