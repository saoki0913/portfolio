"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendContactMessage } from '@/lib/api/contact';
import { ContactRequest } from '@/lib/types/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Loader2, Mail, Send, User, X } from 'lucide-react';

// フォームのバリデーションスキーマ
const formSchema = z.object({
    name: z.string().min(1, { message: '名前を入力してください' }).max(100),
    email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
    subject: z.string().min(1, { message: '件名を入力してください' }).max(200),
    message: z.string().min(10, { message: 'メッセージは10文字以上入力してください' }).max(2000),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const contactData: ContactRequest = {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
            };

            const response = await sendContactMessage(contactData);

            if (response.success) {
                setSubmitStatus('success');
                reset(); // フォームをリセット
            } else {
                setSubmitStatus('error');
                setErrorMessage(response.message || 'メッセージの送信に失敗しました。後でもう一度お試しください。');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('エラーが発生しました。後でもう一度お試しください。');
            console.error('Contact form error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {submitStatus === 'success' ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-green-100">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">メッセージを送信しました</h3>
                        <p className="text-gray-600 mb-6">
                            お問い合わせありがとうございます。できるだけ早くご返信いたします。
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setSubmitStatus('idle')}
                            className="px-6"
                        >
                            新しいメッセージを作成
                        </Button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100">
                    {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start mb-4">
                            <X className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                お名前
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="name"
                                    placeholder="山田 太郎"
                                    className={`pl-10 ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    {...register('name')}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                メールアドレス
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    {...register('email')}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                件名
                            </label>
                            <Input
                                id="subject"
                                placeholder="お問い合わせの件名"
                                className={errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                                {...register('subject')}
                            />
                            {errors.subject && (
                                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                メッセージ
                            </label>
                            <Textarea
                                id="message"
                                rows={6}
                                placeholder="お問い合わせ内容をご記入ください"
                                className={errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                                {...register('message')}
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    送信中...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    メッセージを送信
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
} 
