'use client';

import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // В реальном приложении здесь будет отправка данных на сервер
    console.log('Form submitted:', formData);
    
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
    
    // Очистка формы
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
          {/* Contact Form */}
          <Card className="p-6 sm:p-8 bg-card border-border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">{t('contact.form.name')} *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.form.placeholders.name')}
                  required
                  className="mt-2 border-input bg-input-background focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">{t('contact.form.email')} *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.form.placeholders.email')}
                  required
                  className="mt-2 border-input bg-input-background focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">{t('contact.form.phone')} *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact.form.placeholders.phone')}
                  required
                  className="mt-2 border-input bg-input-background focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground">{t('contact.form.message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.placeholders.message')}
                  rows={4}
                  className="mt-2 border-input bg-input-background focus:border-primary focus:ring-primary"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {t('contact.form.submit')}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {t('contact.form.agreement')}
              </p>
            </form>
          </Card>

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
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <a href="mailto:hello@koagency.me" className="text-foreground hover:text-primary transition-colors">
                      hello@koagency.me
                    </a>
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