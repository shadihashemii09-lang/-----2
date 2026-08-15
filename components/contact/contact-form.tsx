"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-2xl border border-line bg-cream px-5 py-3.5 text-sm text-ink placeholder:text-mute-light transition-colors focus:border-ink/40 focus:outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-line bg-sand/40 p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage">
          <Check className="h-6 w-6" strokeWidth={2} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium text-ink">
          پیامت رسید
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-mute">
          ممنون که نوشتی؛ تیم آئورا تا ۲۴ ساعت آینده بهت پاسخ می‌دهد.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs text-mute">
            نام و نام خانوادگی
          </label>
          <input id="name" required placeholder="مثلاً: سارا محمدی" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs text-mute">
            ایمیل
          </label>
          <input id="email" type="email" required placeholder="you@email.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-2 block text-xs text-mute">
          موضوع
        </label>
        <input id="subject" required placeholder="مثلاً: راهنمای سایز" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-xs text-mute">
          پیام تو
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="هرچی دوست داری بنویس؛ از سوال درباره محصولات تا پیشنهادها…"
          className={`${inputClass} resize-none`}
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send className="h-4 w-4 -scale-x-100" strokeWidth={1.5} />
        ارسال پیام
      </Button>
    </form>
  );
}
