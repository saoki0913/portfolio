'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, useRef } from "react"
import apiClient from "@/lib/api/client"

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject') || '問い合わせ', // デフォルト件名を設定
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
            // フォームをリセット
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

    return (
        <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="お名前を入力してください"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="メールアドレスを入力してください"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">件名</Label>
                <Input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="件名を入力してください"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">メッセージ</Label>
                <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="メッセージを入力してください"
                />
            </div>

            {submitMessage && (
                <div className={`p-4 rounded-md ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {submitMessage.text}
                </div>
            )}

            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? '送信中...' : '送信する'}
            </Button>
        </form>
    )
} 
