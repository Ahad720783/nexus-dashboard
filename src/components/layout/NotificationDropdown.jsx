import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, UserCheck, ShieldCheck, HardDrive, CheckCircle2 } from 'lucide-react';
import { notificationsList } from '../../data/mockData';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsList);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case 'user':
        return <UserCheck className="w-4 h-4 text-indigo-500" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'warning':
        return <HardDrive className="w-4 h-4 text-amber-500" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 z-50 overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-800">Notifications</h4>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-medium bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No notifications to display
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markAsRead(item.id)}
                  className={`flex items-start gap-3 p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                    !item.read ? 'bg-indigo-50/30' : ''
                  }`}
                >
                  <div className="p-2 bg-slate-100 rounded-xl shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${!item.read ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {item.time}
                    </span>
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-2.5 border-t border-slate-100 text-center bg-slate-50/50">
            <span className="text-xs text-slate-500">
              Nexus Real-time Notification Engine
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
