'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Loader2, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calculationData: {
    crm: string;
    users: number;
    implPackage: string;
    totalCost: number;
    implementationCost: number;
    licenseCost: number;
    servicesCost: number;
    calculationDetails: string;
  };
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function LeadForm({ open, onOpenChange, calculationData }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setComment('');
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-55fff793/lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            comment,
            crm: calculationData.crm,
            users: calculationData.users,
            implPackage: calculationData.implPackage,
            totalCost: calculationData.totalCost,
            calculationDetails: calculationData.calculationDetails,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        toast.success('Заявка успешно отправлена!', {
          description: 'Мы свяжемся с вами в ближайшее время',
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onOpenChange(false);
          resetForm();
        }, 2000);
      } else {
        throw new Error(data.error || 'Ошибка отправки заявки');
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка');
      toast.error('Ошибка отправки', {
        description: 'Попробуйте позже или свяжитесь через WhatsApp',
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Получить коммерческое предложение
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Заполните форму и мы отправим детальный расчет на вашу почту
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-8 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Заявка отправлена!</h3>
              <p className="text-slate-500">Мы свяжемся с вами в ближайшее время</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Calculation Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-slate-700 mb-2">Ваш расчет:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Пакет:</span>
                    <span className="font-medium text-slate-900">{calculationData.implPackage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Пользователей:</span>
                    <span className="font-medium text-slate-900">{calculationData.users}</span>
                  </div>
                  <div className="h-px bg-slate-200 my-2" />
                  <div className="flex justify-between text-base">
                    <span className="font-bold text-slate-900">Итого:</span>
                    <span className="font-bold text-[#E60000]">
                      {formatCurrency(calculationData.totalCost)} ₽
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-700">
                    Ваше имя <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    required
                    disabled={status === 'loading'}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-slate-700">
                    Телефон <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    required
                    disabled={status === 'loading'}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    disabled={status === 'loading'}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="comment" className="text-slate-700">
                    Комментарий
                  </Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Дополнительная информация..."
                    disabled={status === 'loading'}
                    className="mt-1.5 resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700">{errorMessage}</div>
                </motion.div>
              )}

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={status === 'loading'}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  disabled={status === 'loading' || !name || !phone}
                  className="bg-[#E60000] hover:bg-[#cc0000]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Отправить заявку
                    </>
                  )}
                </Button>
              </DialogFooter>

              <p className="text-xs text-slate-400 text-center">
                Нажимая "Отправить заявку", вы соглашаетесь с{' '}
                <a href="/privacy" className="text-[#E60000] hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}