'use client'

import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import apiClient from "@/lib/api/client"
import { User, Mail, FileText, MessageSquare, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject') || '問い合わせ',
            message: formData.get('message'),
        };

        try {
            const response = await apiClient.post('/contact', data);

            if (response.status !== 200) {
                throw new Error('Failed to send message');
            }

            setSubmitMessage({
                type: 'success',
                text: 'メッセージが正常に送信されました！'
            });
            if (formRef.current) {
                formRef.current.reset();
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitMessage({
                type: 'error',
                text: 'メッセージの送信に失敗しました。もう一度お試しください。'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputFields = [
        {
            id: 'name',
            label: 'お名前',
            type: 'text',
            placeholder: 'お名前を入力してください',
            icon: User,
            required: true
        },
        {
            id: 'email',
            label: 'メールアドレス',
            type: 'email',
            placeholder: 'example@email.com',
            icon: Mail,
            required: true
        },
        {
            id: 'subject',
            label: '件名',
            type: 'text',
            placeholder: 'お問い合わせの件名',
            icon: FileText,
            required: true
        }
    ];

    return (
        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            {inputFields.map((field, index) => (
                <motion.div
                    key={field.id}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <label
                        htmlFor={field.id}
                        className="block text-sm font-semibold text-neutral-700 mb-2"
                    >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative group">
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === field.id ? 'text-neutral-700' : 'text-neutral-400'}`}>
                            <field.icon className="w-5 h-5" />
                        </div>
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            required={field.required}
                            placeholder={field.placeholder}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 pr-4 py-4 bg-neutral-50/50 border-2 border-neutral-200 rounded-xl text-neutral-800 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:border-neutral-400 focus:bg-white focus:shadow-md hover:border-neutral-300"
                        />
                    </div>
                </motion.div>
            ))}

            <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                    メッセージ
                    <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative group">
                    <div className={`absolute left-4 top-4 transition-colors duration-200 ${focusedField === 'message' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="お問い合わせ内容をご記入ください"
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-4 bg-neutral-50/50 border-2 border-neutral-200 rounded-xl text-neutral-800 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:border-neutral-400 focus:bg-white focus:shadow-md hover:border-neutral-300 resize-none"
                    />
                </div>
            </motion.div>

            {submitMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 p-4 rounded-xl ${submitMessage.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                >
                    {submitMessage.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="font-medium">{submitMessage.text}</span>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-base font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            送信中...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                            送信する
                        </>
                    )}
                </Button>
            </motion.div>
        </form>
    )
}
