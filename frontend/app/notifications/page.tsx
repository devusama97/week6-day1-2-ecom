'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <Link href="/" className="text-sm text-blue-600 hover:text-blue-800">
                        Back to Home
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {notifications.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {notifications.map((notification, index) => (
                                <li key={index} className="p-4 hover:bg-gray-50">
                                    {/* Notification content will go here */}
                                    <p className="text-gray-900">{notification.message}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <div className="text-4xl mb-3">🔔</div>
                            <p className="text-lg font-medium">No notifications yet</p>
                            <p className="text-sm mt-1">We'll notify you when something important happens.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
