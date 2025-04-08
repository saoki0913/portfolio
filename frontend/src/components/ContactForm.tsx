'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
    return (
        <form className="space-y-8" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            };

            try {
                const response = await fetch('http://localhost:8000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                alert('Message sent successfully!');
                e.currentTarget.reset();
            } catch (error) {
                alert('Failed to send message. Please try again.');
            }
        }}>
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
                <Label htmlFor="message">メッセージ</Label>
                <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="メッセージを入力してください"
                />
            </div>
            <Button
                type="submit"
                className="w-full"
            >
                送信する
            </Button>
        </form>
    )
} 