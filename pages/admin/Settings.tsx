import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { Button } from '../../shared/ui/Button';
import { Plus, Settings, Mail, Truck, Image } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function AdminSettingsPage() {
  const navItems = [
    { path: '/admin/settings/banners', label: 'Banners', icon: Image },
    { path: '/admin/settings/contacts', label: 'Contacts', icon: Mail },
    { path: '/admin/settings/shipping', label: 'Shipping', icon: Truck },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-card border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 px-2">Settings</h2>
          <nav className="flex lg:flex-col gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-card border rounded-lg p-6">
          <Outlet /> {/* This will render the nested route components */}
        </main>
      </div>
    </AdminLayout>
  );
}

// Placeholder components for nested routes
export function BannerSettings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Banner Settings</h1>
      <p className="text-muted-foreground">Configure your website banners here.</p>
      {/* Banner settings form will go here */}
      <div className="mt-6 p-4 border rounded-md bg-background">
        <h3 className="text-lg font-semibold mb-3">Hero Banner</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Enter banner title" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Enter banner description" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <input type="file" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Call to Action URL</label>
            <input type="url" className="w-full px-3 py-2 border rounded-md" placeholder="https://example.com" />
          </div>
        </div>
        <Button className="mt-4">Save Banner Settings</Button>
      </div>
    </div>
  );
}

export function ContactSettings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Settings</h1>
      <p className="text-muted-foreground">Manage your contact information and inquiry settings.</p>
      {/* Contact settings form will go here */}
      <div className="mt-6 p-4 border rounded-md bg-background">
        <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input type="email" className="w-full px-3 py-2 border rounded-md" placeholder="contact@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input type="tel" className="w-full px-3 py-2 border rounded-md" placeholder="+1 123 456 7890" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Address</label>
            <textarea rows={3} className="w-full px-3 py-2 border rounded-md" placeholder="Your company address"></textarea>
          </div>
        </div>
        <Button className="mt-4">Save Contact Settings</Button>
      </div>
    </div>
  );
}

export function ShippingSettings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shipping Settings</h1>
      <p className="text-muted-foreground">Configure your shipping options and rates.</p>
      {/* Shipping settings form will go here */}
      <div className="mt-6 p-4 border rounded-md bg-background">
        <h3 className="text-lg font-semibold mb-3">Shipping Zones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Shipping Zone</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Domestic" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Default Shipping Rate</label>
            <input type="number" step="0.01" className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 5.00" />
          </div>
        </div>
        <Button className="mt-4">Save Shipping Settings</Button>
      </div>
    </div>
  );
}
