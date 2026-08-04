'use client';

import { Card } from './ui/card';
import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { AmoForm } from './AmoForm';
import { CONTACT_EMAILS } from '@/lib/contacts';

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 text-foreground">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form — amoCRM widget (id 1717818) */}
          <AmoForm />

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="p-8 bg-card border-border shadow-sm">
              <h3 className="mb-6 text-foreground font-semibold">
                {t('contact.otherMethods')}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-2">Email — пишите по нужному вопросу</div>
                    <ul className="space-y-2">
                      {CONTACT_EMAILS.map((e) => (
                        <li key={e.address}>
                          <a
                            href={`mailto:${e.address}`}
                            className="group flex items-start justify-between gap-3 rounded-md border border-border/60 bg-background px-3 py-2 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                          >
                            <span className="flex flex-col">
                              <span className="text-sm text-foreground font-medium">
                                {e.address}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {e.label} — {e.purpose}
                              </span>
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t('contact.form.phone')}</div>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+447835212468" className="text-foreground hover:text-primary transition-colors">
                        +44 7835 212468
                      </a>
                      <a href="tel:+79912223880" className="text-foreground hover:text-primary transition-colors">
                        +7 991 222-38-80
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Telegram</div>
                    <a href="https://t.me/ko_agency" className="text-foreground hover:text-primary transition-colors">
                      @ko_agency
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Working Hours */}
            <Card className="p-8 bg-primary border-0 text-primary-foreground">
              <h3 className="mb-4 font-semibold">
                {t('contact.workingHours.title')}
              </h3>
              <div className="space-y-2 text-primary-foreground/90">
                <p>{t('contact.workingHours.weekdays')}</p>
                <p>{t('contact.workingHours.weekend')}</p>
                <p className="pt-2">{t('contact.workingHours.support')}</p>
              </div>
            </Card>

            {/* Response Time */}
            <Card className="p-6 bg-card border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  {t('contact.responseTime')} <span className="text-foreground font-medium">{t('contact.minutes')}</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}