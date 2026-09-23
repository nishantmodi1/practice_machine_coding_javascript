import React, { useEffect, useRef, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';

const GrapesJSBuilder = () => {
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGrapesJS = async () => {
      if (!window.grapesjs) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/grapesjs/0.21.7/grapes.min.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize GrapesJS with comprehensive configuration
      const editor = window.grapesjs.init({
        plugins: [],
        pluginsOpts: {},
        container: '#gjs',
        fromElement: false,
        height: '100%',
        width: 'auto',
        storageManager: false,
        
        panels: {
          defaults: [
            {
              id: 'basic-actions',
              el: '.panel__basic-actions',
              buttons: [
                {
                  id: 'visibility',
                  active: true,
                  className: 'btn-toggle-borders',
                  label: '<i class="fa fa-clone"></i>',
                  command: 'sw-visibility',
                },
                {
                  id: 'export',
                  className: 'btn-open-export',
                  label: '<i class="fa fa-code"></i>',
                  command: 'export-template',
                },
                {
                  id: 'undo',
                  className: 'btn-undo',
                  label: '<i class="fa fa-undo"></i>',
                  command: 'core:undo',
                },
                {
                  id: 'redo',
                  className: 'btn-redo',
                  label: '<i class="fa fa-repeat"></i>',
                  command: 'core:redo',
                },
                {
                  id: 'clear',
                  className: 'btn-clear',
                  label: '<i class="fa fa-trash"></i>',
                  command: 'clear-canvas',
                },
              ],
            },
            {
              id: 'panel-devices',
              el: '.panel__devices',
              buttons: [
                {
                  id: 'device-desktop',
                  label: '<i class="fa fa-desktop"></i>',
                  command: 'set-device-desktop',
                  active: true,
                  togglable: false,
                },
                {
                  id: 'device-tablet',
                  label: '<i class="fa fa-tablet"></i>',
                  command: 'set-device-tablet',
                  togglable: false,
                },
                {
                  id: 'device-mobile',
                  label: '<i class="fa fa-mobile"></i>',
                  command: 'set-device-mobile',
                  togglable: false,
                },
              ],
            },
            {
              id: 'panel-export',
              el: '.panel__export',
              buttons: [
                {
                  id: 'export-html',
                  className: 'btn-export-html',
                  label: '<i class="fa fa-download"></i> HTML',
                  command: 'export-html',
                },
                {
                  id: 'export-zip',
                  className: 'btn-export-zip',
                  label: '<i class="fa fa-file-archive-o"></i> ZIP',
                  command: 'export-zip',
                },
              ],
            },
          ],
        },
        
        deviceManager: {
          devices: [
            {
              name: 'Desktop',
              width: '',
            },
            {
              name: 'Tablet',
              width: '768px',
              widthMedia: '992px',
            },
            {
              name: 'Mobile',
              width: '375px',
              widthMedia: '768px',
            },
          ],
        },
        
        blockManager: {
          appendTo: '.blocks-container',
          blocks: [
            // LAYOUT BLOCKS
            {
              id: 'section',
              label: '<i class="fa fa-square-o"></i><div>Section</div>',
              category: 'Layout',
              content: `<section style="padding: 60px 20px; background-color: #f9fafb;">
                <div style="max-width: 1200px; margin: 0 auto;">
                  <h2 style="font-size: 2rem; margin-bottom: 1rem;">Section Title</h2>
                  <p style="color: #6b7280;">Add your content here.</p>
                </div>
              </section>`,
            },
            {
              id: 'container',
              label: '<i class="fa fa-square"></i><div>Container</div>',
              category: 'Layout',
              content: '<div style="max-width: 1200px; margin: 0 auto; padding: 20px;"></div>',
            },
            {
              id: '1-column',
              label: '<i class="fa fa-minus"></i><div>1 Column</div>',
              category: 'Layout',
              content: '<div style="padding: 20px;"><div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Column</div></div>',
            },
            {
              id: '2-columns',
              label: '<i class="fa fa-columns"></i><div>2 Columns</div>',
              category: 'Layout',
              content: `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px;">
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Column 1</div>
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Column 2</div>
              </div>`,
            },
            {
              id: '3-columns',
              label: '<i class="fa fa-th"></i><div>3 Columns</div>',
              category: 'Layout',
              content: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px;">
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Column 1</div>
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Column 2</div>
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Column 3</div>
              </div>`,
            },
            {
              id: '4-columns',
              label: '<i class="fa fa-th-large"></i><div>4 Columns</div>',
              category: 'Layout',
              content: `<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 20px;">
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Col 1</div>
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Col 2</div>
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Col 3</div>
                <div style="padding: 20px; background: #f9fafb; border-radius: 8px; min-height: 100px;">Col 4</div>
              </div>`,
            },
            
            // NAVIGATION BLOCKS
            {
              id: 'navbar',
              label: '<i class="fa fa-navicon"></i><div>Navbar</div>',
              category: 'Navigation',
              content: `<nav style="width: 100%; background: #1f2937; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;">
                <div style="color: white; font-size: 1.5rem; font-weight: bold;">Logo</div>
                <div style="display: flex; gap: 2rem;">
                  <a href="#" style="color: white; text-decoration: none;">Home</a>
                  <a href="#" style="color: white; text-decoration: none;">About</a>
                  <a href="#" style="color: white; text-decoration: none;">Services</a>
                  <a href="#" style="color: white; text-decoration: none;">Contact</a>
                </div>
                <button style="background: #3b82f6; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 0.375rem; cursor: pointer; font-weight: 600;">Get Started</button>
              </nav>`,
            },
            {
              id: 'navbar-centered',
              label: '<i class="fa fa-bars"></i><div>Navbar Center</div>',
              category: 'Navigation',
              content: `<nav style="width: 100%; background: white; padding: 1rem 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; justify-content: center; align-items: center; gap: 3rem;">
                <a href="#" style="color: #1f2937; text-decoration: none; font-weight: 500;">Home</a>
                <a href="#" style="color: #1f2937; text-decoration: none; font-weight: 500;">Features</a>
                <div style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">BRAND</div>
                <a href="#" style="color: #1f2937; text-decoration: none; font-weight: 500;">Pricing</a>
                <a href="#" style="color: #1f2937; text-decoration: none; font-weight: 500;">Contact</a>
              </nav>`,
            },
            {
              id: 'sidebar-nav',
              label: '<i class="fa fa-list"></i><div>Sidebar Menu</div>',
              category: 'Navigation',
              // content: `<aside style="width: 250px; background: #1f2937; min-height: 400px; padding: 2rem 0;">
              content: `<aside style="flex: 0 0 250px; background: #1f2937; min-height: 400px; padding: 2rem 0;">
                <div style="padding: 0 1.5rem; margin-bottom: 2rem;">
                  <h3 style="color: white; font-size: 1.2rem; margin: 0;">Menu</h3>
                </div>
                <nav style="display: flex; flex-direction: column;">
                  <a href="#" style="color: white; padding: 0.75rem 1.5rem; text-decoration: none; background: #374151;">Dashboard</a>
                  <a href="#" style="color: #9ca3af; padding: 0.75rem 1.5rem; text-decoration: none;">Projects</a>
                  <a href="#" style="color: #9ca3af; padding: 0.75rem 1.5rem; text-decoration: none;">Team</a>
                  <a href="#" style="color: #9ca3af; padding: 0.75rem 1.5rem; text-decoration: none;">Settings</a>
                </nav>
              </aside>`,
            },
            
            // BASIC ELEMENTS
            {
              id: 'text',
              label: '<i class="fa fa-text-width"></i><div>Text</div>',
              category: 'Basic',
              content: '<p style="color: #374151; line-height: 1.6;">Insert your text here. You can customize the font, size, color, and more.</p>',
            },
            {
              id: 'heading',
              label: '<i class="fa fa-header"></i><div>Heading</div>',
              category: 'Basic',
              content: '<h2 style="font-size: 2rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem;">Your Heading</h2>',
            },
            {
              id: 'image',
              label: '<i class="fa fa-image"></i><div>Image</div>',
              category: 'Basic',
              content: { type: 'image' },
            },
            {
              id: 'video',
              label: '<i class="fa fa-video-camera"></i><div>Video</div>',
              category: 'Basic',
              content: '<video controls style="width: 100%; max-width: 600px; border-radius: 8px;"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>',
            },
            {
              id: 'link',
              label: '<i class="fa fa-link"></i><div>Link</div>',
              category: 'Basic',
              content: '<a href="#" style="color: #3b82f6; text-decoration: underline;">Click here</a>',
            },
            
            // BUTTON BLOCKS
            {
              id: 'button-primary',
              label: '<i class="fa fa-hand-pointer-o"></i><div>Button</div>',
              category: 'Buttons',
              content: '<button style="background: #3b82f6; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 1rem;">Click Me</button>',
            },
            {
              id: 'button-secondary',
              label: '<i class="fa fa-square-o"></i><div>Outline Button</div>',
              category: 'Buttons',
              content: '<button style="background: transparent; color: #3b82f6; border: 2px solid #3b82f6; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 1rem;">Click Me</button>',
            },
            {
              id: 'button-group',
              label: '<i class="fa fa-th"></i><div>Button Group</div>',
              category: 'Buttons',
              content: `<div style="display: flex; gap: 1rem;">
                <button style="background: #3b82f6; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">Primary</button>
                <button style="background: #6b7280; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">Secondary</button>
              </div>`,
            },
            
            // CARD BLOCKS
            {
              id: 'card-basic',
              label: '<i class="fa fa-id-card"></i><div>Card</div>',
              category: 'Cards',
              content: `<div style="background: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 1.5rem; max-width: 350px;">
                <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; color: #1f2937;">Card Title</h3>
                <p style="color: #6b7280; margin-bottom: 1rem;">This is a card description. Add your content here.</p>
                <button style="background: #3b82f6; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 0.375rem; cursor: pointer; font-weight: 600;">Learn More</button>
              </div>`,
            },
            {
              id: 'card-image',
              label: '<i class="fa fa-picture-o"></i><div>Image Card</div>',
              category: 'Cards',
              content: `<div style="background: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: auto; max-width: 350px;">
                <img src="https://via.placeholder.com/350x200" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 1.5rem;">
                  <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #1f2937;">Card Title</h3>
                  <p style="color: #6b7280; margin-bottom: 1rem;">This is a card with an image.</p>
                  <button style="background: #3b82f6; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 0.375rem; cursor: pointer; font-weight: 600;">Read More</button>
                </div>
              </div>`,
            },
            {
              id: 'card-pricing',
              label: '<i class="fa fa-usd"></i><div>Pricing Card</div>',
              category: 'Cards',
              content: `<div style="background: white; border: 2px solid #e5e7eb; border-radius: 0.5rem; padding: 2rem; max-width: 320px; text-align: center;">
                <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Starter</h3>
                <div style="font-size: 3rem; font-weight: 700; color: #3b82f6; margin: 1rem 0;">$29<span style="font-size: 1.5rem; color: #6b7280;">/mo</span></div>
                <ul style="list-style: none; padding: 0; margin: 1.5rem 0; text-align: left;">
                  <li style="padding: 0.5rem 0; color: #6b7280;"><i class="fa fa-check" style="color: #10b981;"></i> Feature 1</li>
                  <li style="padding: 0.5rem 0; color: #6b7280;"><i class="fa fa-check" style="color: #10b981;"></i> Feature 2</li>
                  <li style="padding: 0.5rem 0; color: #6b7280;"><i class="fa fa-check" style="color: #10b981;"></i> Feature 3</li>
                </ul>
                <button style="background: #3b82f6; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; width: 100%;">Get Started</button>
              </div>`,
            },
            
            // FORM BLOCKS
            {
              id: 'form-contact',
              label: '<i class="fa fa-wpforms"></i><div>Contact Form</div>',
              category: 'Forms',
              content: `<form style="max-width: 500px; background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; color: #1f2937;">Contact Us</h3>
                <div style="margin-bottom: 1rem;">
                  <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Name</label>
                  <input type="text" placeholder="Your name" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 1rem;">
                  <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Email</label>
                  <input type="email" placeholder="your@email.com" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 1.5rem;">
                  <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Message</label>
                  <textarea placeholder="Your message" rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem; resize: vertical;"></textarea>
                </div>
                <button type="submit" style="background: #3b82f6; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; width: 100%;">Send Message</button>
              </form>`,
            },
            {
              id: 'form-newsletter',
              label: '<i class="fa fa-envelope"></i><div>Newsletter</div>',
              category: 'Forms',
              content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem 2rem; border-radius: 0.5rem; text-align: center; max-width: 600px;">
                <h3 style="color: white; font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem;">Subscribe to our Newsletter</h3>
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 1.5rem;">Get the latest updates delivered to your inbox.</p>
                <form style="display: flex; gap: 0.5rem; max-width: 400px; margin: 0 auto;">
                  <input type="email" placeholder="Enter your email" style="flex: 1; padding: 0.75rem; border: none; border-radius: 0.375rem; font-size: 1rem;">
                  <button type="submit" style="background: white; color: #667eea; border: none; padding: 0.75rem 1.5rem; border-radius: 0.375rem; cursor: pointer; font-weight: 600;">Subscribe</button>
                </form>
              </div>`,
            },
            
            // TABLE BLOCKS
            {
              id: 'table-basic',
              label: '<i class="fa fa-table"></i><div>Table</div>',
              category: 'Tables',
              // content: `<table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              content: `<table style="flex: 1 1 auto; min-width: 400px; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <thead>
                  <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                    <th style="padding: 1rem; text-align: left; font-weight: 600; color: #1f2937;">Name</th>
                    <th style="padding: 1rem; text-align: left; font-weight: 600; color: #1f2937;">Email</th>
                    <th style="padding: 1rem; text-align: left; font-weight: 600; color: #1f2937;">Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 1rem; color: #374151;">John Doe</td>
                    <td style="padding: 1rem; color: #374151;">john@example.com</td>
                    <td style="padding: 1rem; color: #374151;">Developer</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 1rem; color: #374151;">Jane Smith</td>
                    <td style="padding: 1rem; color: #374151;">jane@example.com</td>
                    <td style="padding: 1rem; color: #374151;">Designer</td>
                  </tr>
                  <tr>
                    <td style="padding: 1rem; color: #374151;">Bob Johnson</td>
                    <td style="padding: 1rem; color: #374151;">bob@example.com</td>
                    <td style="padding: 1rem; color: #374151;">Manager</td>
                  </tr>
                </tbody>
              </table>`,
            },
            {
              id: 'table-striped',
              label: '<i class="fa fa-list-alt"></i><div>Striped Table</div>',
              category: 'Tables',
              // content: `<table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              content: `<table style="flex: 1 1 auto; min-width: 400px; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <thead>
                  <tr style="background: #3b82f6; color: white;">
                    <th style="padding: 1rem; text-align: left; font-weight: 600;">Product</th>
                    <th style="padding: 1rem; text-align: left; font-weight: 600;">Price</th>
                    <th style="padding: 1rem; text-align: left; font-weight: 600;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background: #f9fafb;">
                    <td style="padding: 1rem; color: #374151;">Product A</td>
                    <td style="padding: 1rem; color: #374151;">$99</td>
                    <td style="padding: 1rem; color: #10b981;">In Stock</td>
                  </tr>
                  <tr>
                    <td style="padding: 1rem; color: #374151;">Product B</td>
                    <td style="padding: 1rem; color: #374151;">$149</td>
                    <td style="padding: 1rem; color: #10b981;">In Stock</td>
                  </tr>
                  <tr style="background: #f9fafb;">
                    <td style="padding: 1rem; color: #374151;">Product C</td>
                    <td style="padding: 1rem; color: #374151;">$199</td>
                    <td style="padding: 1rem; color: #ef4444;">Out of Stock</td>
                  </tr>
                </tbody>
              </table>`,
            },
            
            // HERO SECTIONS
            {
              id: 'hero-gradient',
              label: '<i class="fa fa-star"></i><div>Hero Section</div>',
              category: 'Heroes',
              content: `<section style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 5rem 2rem; text-align: center;">
                <h1 style="color: white; font-size: 3rem; font-weight: 700; margin-bottom: 1rem;">Build Amazing Websites</h1>
                <p style="color: rgba(255,255,255,0.9); font-size: 1.25rem; max-width: 600px; margin: 0 auto 2rem;">Create stunning, professional websites without writing a single line of code.</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                  <button style="background: white; color: #667eea; border: none; padding: 1rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 1rem;">Get Started</button>
                  <button style="background: transparent; color: white; border: 2px solid white; padding: 1rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 1rem;">Learn More</button>
                </div>
              </section>`,
            },
            
            // TESTIMONIAL BLOCKS
            {
              id: 'testimonial',
              label: '<i class="fa fa-quote-left"></i><div>Testimonial</div>',
              category: 'Content',
              content: `<div style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px;">
                <div style="color: #3b82f6; font-size: 2rem; margin-bottom: 1rem;">"</div>
                <p style="color: #374151; font-size: 1.125rem; line-height: 1.6; margin-bottom: 1.5rem;">This is an amazing product! It has completely transformed the way we work.</p>
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <div style="width: 50px; height: 50px; border-radius: 50%; background: #3b82f6;"></div>
                  <div>
                    <div style="font-weight: 600; color: #1f2937;">John Doe</div>
                    <div style="color: #6b7280; font-size: 0.875rem;">CEO, Company Inc.</div>
                  </div>
                </div>
              </div>`,
            },
            
            // FOOTER BLOCKS
            {
              id: 'footer',
              label: '<i class="fa fa-ellipsis-h"></i><div>Footer</div>',
              category: 'Navigation',
              content: `<footer style="width: 100%; background: #1f2937; color: white; padding: 3rem 2rem 1.5rem;">
                <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-bottom: 2rem;">
                  <div>
                    <h4 style="font-weight: 600; margin-bottom: 1rem;">Company</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                      <a href="#" style="color: #9ca3af; text-decoration: none;">About</a>
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Blog</a>
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Careers</a>
                    </div>
                  </div>
                  <div>
                    <h4 style="font-weight: 600; margin-bottom: 1rem;">Product</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Features</a>
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Pricing</a>
                      <a href="#" style="color: #9ca3af; text-decoration: none;">FAQ</a>
                    </div>
                  </div>
                  <div>
                    <h4 style="font-weight: 600; margin-bottom: 1rem;">Resources</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Documentation</a>
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Help Center</a>
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Community</a>
                    </div>
                  </div>
                  <div>
                    <h4 style="font-weight: 600; margin-bottom: 1rem;">Legal</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Privacy</a>
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Terms</a>
                      <a href="#" style="color: #9ca3af; text-decoration: none;">Security</a>
                    </div>
                  </div>
                </div>
                <div style="border-top: 1px solid #374151; padding-top: 1.5rem; text-align: center; color: #9ca3af;">
                  © 2026 Your Company. All rights reserved.
                </div>
              </footer>`,
            },
            
            // DIVIDERS
            {
              id: 'divider',
              label: '<i class="fa fa-minus"></i><div>Divider</div>',
              category: 'Basic',
              content: '<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 2rem 0;">',
            },
            {
              id: 'spacer',
              label: '<i class="fa fa-arrows-v"></i><div>Spacer</div>',
              category: 'Basic',
              content: '<div style="height: 60px;"></div>',
            },
          ],
        },
        
        styleManager: {
          appendTo: '.styles-container',
          sectors: [
            {
              name: 'Layout',
              open: true,
              buildProps: ['display', 'flex', 'flex-direction', 'justify-content', 'align-items', 'width', 'height', 'max-width', 'min-width', 'min-height', 'padding', 'margin'],
            },
            {
              name: 'Typography',
              open: false,
              buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-transform'],
            },
            {
              name: 'Decorations',
              open: false,
              buildProps: ['background', 'background-color', 'border-radius', 'border', 'box-shadow', 'opacity'],
            },
            {
              name: 'Position',
              open: false,
              buildProps: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
            },
            {
              name: 'Effects',
              open: false,
              buildProps: ['transition', 'transform', 'cursor', 'overflow'],
            },
          ],
        },
        
        layerManager: {
          appendTo: '.layers-container',
        },
        
        traitManager: {
          appendTo: '.traits-container',
        },
        
        // canvas: {
        //   styles: [
        //     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        //   ],
        //   // scripts: [],
        // },

        canvas: {
          styles: [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
            'data:text/css;base64,' + btoa(`
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                min-height: 100vh;
                background: white;
              }
            `)
          ],
          scripts: [],
        },
      });

      editorRef.current = editor;

      // Ensure proper component selection and style updates
      // editor.on('component:selected', (component) => {
      //   console.log('Component selected:', component);
      //   editor.StyleManager.render();
      //   editor.TraitManager.render();
      // });

editor.on('component:selected', (component) => {
  console.log('Component selected:', component);
  
  // Just render the panels, don't auto-modify styles
  editor.StyleManager.render();
  editor.TraitManager.render();
});
      

      // editor.addComponents(`
      //   <div style="padding: 40px; max-width: 1200px; margin: 0 auto;">
      //     <h1 style="text-align: center; color: #1f2937; margin-bottom: 40px;">Welcome to Your Website Builder</h1>
          
      //     <!-- Demo Card -->
      //     <div style="background: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 1.5rem; max-width: 350px; margin: 0 auto 30px;">
      //       <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; color: #1f2937;">Sample Card</h3>
      //       <p style="color: #6b7280; margin-bottom: 1rem;">This is a demo card. Drag more components from the left sidebar!</p>
      //       <button style="background: #3b82f6; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 0.375rem; cursor: pointer; font-weight: 600;">Click Me</button>
      //     </div>

      //     <!-- Demo Table -->
      //     <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 30px;">
      //       <thead>
      //         <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
      //           <th style="padding: 1rem; text-align: left; font-weight: 600; color: #1f2937;">Name</th>
      //           <th style="padding: 1rem; text-align: left; font-weight: 600; color: #1f2937;">Email</th>
      //           <th style="padding: 1rem; text-align: left; font-weight: 600; color: #1f2937;">Role</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         <tr style="border-bottom: 1px solid #e5e7eb;">
      //           <td style="padding: 1rem; color: #374151;">John Doe</td>
      //           <td style="padding: 1rem; color: #374151;">john@example.com</td>
      //           <td style="padding: 1rem; color: #374151;">Developer</td>
      //         </tr>
      //         <tr style="border-bottom: 1px solid #e5e7eb;">
      //           <td style="padding: 1rem; color: #374151;">Jane Smith</td>
      //           <td style="padding: 1rem; color: #374151;">jane@example.com</td>
      //           <td style="padding: 1rem; color: #374151;">Designer</td>
      //         </tr>
      //       </tbody>
      //     </table>

      //     <!-- Demo Button Section -->
      //     <div style="text-align: center;">
      //       <h3 style="margin-bottom: 20px; color: #1f2937;">Try These Buttons</h3>
      //       <div style="display: flex; gap: 1rem; justify-content: center;">
      //         <button style="background: #3b82f6; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">Primary</button>
      //         <button style="background: transparent; color: #3b82f6; border: 2px solid #3b82f6; padding: 0.75rem 2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">Outline</button>
      //       </div>
      //     </div>
      //   </div>
      // `);


      // Set initial canvas content only if empty
      // if (editor.getComponents().length === 0) {
      //   editor.setComponents(`
      //     <div style="min-height: 100vh; padding: 20px;">
      //       <div style="text-align: center; padding: 60px 20px; color: #9ca3af;">
      //         <h2 style="font-size: 2rem; margin-bottom: 10px;">Start Building</h2>
      //         <p>Drag and drop components from the left sidebar</p>
      //       </div>
      //     </div>
      //   `);
      // }

      // Set initial canvas content only if empty
      if (editor.getComponents().length === 0) {
  editor.setComponents(`
    <div style="min-height: 100vh; display: flex; flex-wrap: wrap; gap: 0; align-items: stretch;">
      <div style="flex: 1; min-width: 300px; text-align: center; padding: 60px 20px; color: #9ca3af;">
        <h2 style="font-size: 2rem; margin-bottom: 10px;">Start Building</h2>
        <p>Drag and drop components from the left sidebar</p>
      </div>
    </div>
  `);
}

      console.log('🚀 Initial canvas set with droppable area');
      console.log('📊 Current components:', editor.getComponents());

      // Custom Commands
      editor.Commands.add('set-device-desktop', {
        run: (editor) => editor.setDevice('Desktop'),
      });
      editor.Commands.add('set-device-tablet', {
        run: (editor) => editor.setDevice('Tablet'),
      });
      editor.Commands.add('set-device-mobile', {
        run: (editor) => editor.setDevice('Mobile'),
      });
      
      editor.Commands.add('clear-canvas', {
        run: (editor) => {
          if (confirm('Are you sure you want to clear the canvas?')) {
            editor.DomComponents.clear();
            editor.CssComposer.clear();
          }
        },
      });
      
      editor.Commands.add('export-html', {
        run: (editor) => {
          const html = editor.getHtml();
          const css = editor.getCss();
          const fullHtml = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>My Website</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
                ${css}
              </style>
            </head>
            <body>
              ${html}
            </body>
          </html>`;
          
          const blob = new Blob([fullHtml], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'website.html';
          a.click();
          URL.revokeObjectURL(url);
        },
      });
      
      editor.Commands.add('export-zip', {
        run: async (editor) => {
          const html = editor.getHtml();
          const css = editor.getCss();
          
          const indexHtml = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Website</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="style.css">
          </head>
          <body>
            ${html}
          </body>
          </html>`;
                    
                    const stylesCss = `* { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
          ${css}`;
          
          // Create a simple download for HTML and CSS files
          const htmlBlob = new Blob([indexHtml], { type: 'text/html' });
          const cssBlob = new Blob([stylesCss], { type: 'text/css' });
          
          const htmlUrl = URL.createObjectURL(htmlBlob);
          const cssUrl = URL.createObjectURL(cssBlob);
          
          const aHtml = document.createElement('a');
          aHtml.href = htmlUrl;
          aHtml.download = 'index.html';
          aHtml.click();
          
          setTimeout(() => {
            const aCss = document.createElement('a');
            aCss.href = cssUrl;
            aCss.download = 'style.css';
            aCss.click();
            
            URL.revokeObjectURL(htmlUrl);
            URL.revokeObjectURL(cssUrl);
          }, 100);
        },
      });

      setIsLoading(false);

      // Fix duplicate categories
      // setTimeout(() => {
      //   const container = document.querySelector('.blocks-container');
      //   if (container) {
      //     const categories = container.querySelectorAll('.gjs-block-category');
      //     const seen = new Set();
      //     categories.forEach(cat => {
      //       const title = cat.querySelector('.gjs-title')?.textContent;
      //       if (seen.has(title)) {
      //         cat.remove();
      //       } else {
      //         seen.add(title);
      //       }
      //     });
      //   }
      // }, 500);

      setTimeout(() => {
        const container = document.querySelector('.blocks-container');
        if (container) {
          const categories = container.querySelectorAll('.gjs-block-category');
          const categoryMap = new Map();
          
          // First pass: collect all categories by title
          categories.forEach((cat, index) => {
            const title = cat.querySelector('.gjs-title')?.textContent;
            if (title) {
              if (!categoryMap.has(title)) {
                categoryMap.set(title, []);
              }
              categoryMap.get(title).push({ element: cat, index });
            }
          });
          
          // Second pass: remove first occurrence if duplicates exist
          categoryMap.forEach((occurrences) => {
            if (occurrences.length > 1) {
              // Remove the first occurrence (keep the second one)
              occurrences[0].element.remove();
            }
          });
        }
      }, 500);
    };

    // Fix duplicate style sections
    setTimeout(() => {
      const stylesContainer = document.querySelector('.styles-container');
      if (stylesContainer) {
        const sectors = stylesContainer.querySelectorAll('.gjs-sm-sector');
        const sectorMap = new Map();
        
        // Collect all sectors by title
        sectors.forEach((sector) => {
          const title = sector.querySelector('.gjs-sm-sector-title')?.textContent;
          if (title) {
            if (!sectorMap.has(title)) {
              sectorMap.set(title, []);
            }
            sectorMap.get(title).push(sector);
          }
        });
        
        // Remove first occurrence if duplicates exist
        sectorMap.forEach((occurrences) => {
          if (occurrences.length > 1) {
            occurrences[0].remove();
          }
        });
      }
    }, 600);

    loadGrapesJS();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="builder-container">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        
        .builder-container { display: flex; height: 100vh; background: #0f172a; overflow: auto; }
        
        .sidebar { width: 300px; background: #1e293b; color: white; display: flex; flex-direction: column; border-right: 1px solid #334155; overflow: auto; }
        .sidebar-header { padding: 20px; border-bottom: 1px solid #334155; background: #0f172a; }
        .sidebar-header h3 { margin: 0; font-size: 1rem; font-weight: 600; color: #f1f5f9; display: flex; align-items: center; gap: 8px; }
        .sidebar-content { flex: 1; overflow-y: auto; }
        
        .blocks-container { padding: 15px; }
        
        .gjs-block-category { margin-bottom: 20px; }
        .gjs-block-category .gjs-title { 
          color: #94a3b8; 
          font-size: 0.75rem; 
          font-weight: 600; 
          text-transform: uppercase; 
          letter-spacing: 0.05em; 
          margin-bottom: 10px; 
          padding: 0 5px;
        }
        
        .gjs-block { 
          background: #334155; 
          border: 1px solid #475569; 
          border-radius: 8px; 
          padding: 12px; 
          margin-bottom: 8px; 
          cursor: pointer; 
          transition: all 0.2s;
          text-align: center;
          color: #e2e8f0;
          font-size: 0.75rem;
          user-select: none;
          -webkit-user-drag: element;
        }
        .gjs-block.gjs-bdrag {
          opacity: 0.5;
        }
        .gjs-block:hover { 
          background: #475569; 
          border-color: #3b82f6; 
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        .gjs-block i { 
          font-size: 20px; 
          display: block; 
          margin-bottom: 6px; 
          color: #3b82f6; 
        }
        .gjs-block div {
          font-weight: 500;
        }
        
        .main-editor { flex: 1; display: flex; flex-direction: column; overflow: auto; }
        
        .toolbar { 
          background: #1e293b; 
          border-bottom: 1px solid #334155; 
          padding: 12px 20px; 
          display: flex; 
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .toolbar-section {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .toolbar-divider {
          width: 1px;
          height: 24px;
          background: #334155;
        }
        
        .panel__basic-actions, .panel__devices, .panel__export { display: flex; gap: 6px; }
        
        .toolbar button, .gjs-pn-btn { 
          background: #334155; 
          border: 1px solid #475569; 
          color: #e2e8f0; 
          padding: 8px 14px; 
          border-radius: 6px; 
          cursor: pointer; 
          transition: all 0.2s;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .toolbar button:hover, .gjs-pn-btn:hover { 
          background: #475569; 
          border-color: #3b82f6; 
        }
        .gjs-pn-btn.gjs-pn-active { 
          background: #3b82f6; 
          border-color: #3b82f6; 
          color: white;
        }
        
        #gjs { flex: 1; background: #0f172; overflow: auto;  position: relative;}
        
        // .gjs-cv-canvas { background: #0f172a;  top: 0; width: 100%; height: 100%;}
        // .gjs-cv-canvas { background: #f5f5f5; width: 100% !important; height: 100% !important;}
        // .gjs-frame { border: none; box-shadow: 0 0 0 1px #334155; outline: none; height: 100%; width: 100%;}
        // .gjs-frame { 
        //   border: none; 
        //   outline: none;
        //   height: 100% !important;
        //   width: 100% !important;
        //   background: white;
        // }

        .gjs-cv-canvas { 
          background: #f5f5f5; 
          width: 100% !important; 
          height: 100% !important;
        }
        .gjs-frame { 
          border: none !important;
          outline: none !important;
          width: 100% !important;
          height: 100% !important;
          background: white !important;
        }
        
        .properties-panel { width: 320px; background: #1e293b; border-left: 1px solid #334155; overflow-y: auto; display: flex; flex-direction: column; }
        
        .properties-section {
          border-bottom: 1px solid #334155;
        }
        
        .properties-section-header {
          background: #0f172a;
          color: #f1f5f9;
          padding: 12px 16px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .properties-section-content {
          padding: 16px;
        }
        
        .layers-container, .traits-container, .styles-container {
          color: #e2e8f0;
        }
        
        .gjs-sm-sector { border-bottom: 1px solid #334155; }
        .gjs-sm-sector-title { 
          background: #0f172a; 
          color: #f1f5f9; 
          padding: 10px 15px; 
          font-weight: 600; 
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .gjs-sm-properties { padding: 15px; background: #1e293b; }
        .gjs-sm-property { margin-bottom: 12px; }
        .gjs-sm-label { color: #94a3b8; font-size: 11px; margin-bottom: 4px; font-weight: 500; }
        .gjs-field, .gjs-sm-input { 
          background: #0f172a; 
          border: 1px solid #475569; 
          color: #e2e8f0; 
          padding: 8px; 
          border-radius: 4px; 
          width: 100%; 
        }
        .gjs-field:focus, .gjs-sm-input:focus {
          outline: none;
          border-color: #3b82f6;
        }
        
        .gjs-layer { 
          background: #334155; 
          color: #e2e8f0; 
          border: 1px solid #475569; 
          margin-bottom: 4px;
          border-radius: 4px;
        }
        .gjs-layer:hover { background: #475569; }
        .gjs-layer.gjs-selected { background: #3b82f6; border-color: #3b82f6; }
        
        .gjs-trait { margin-bottom: 12px; }
        .gjs-trait .gjs-label { color: #94a3b8; font-size: 11px; margin-bottom: 4px; font-weight: 500; }
        .gjs-trait input, .gjs-trait select { 
          background: #0f172a; 
          border: 1px solid #475569; 
          color: #e2e8f0; 
          padding: 8px; 
          border-radius: 4px; 
          width: 100%; 
        }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        
        ${isLoading ? `
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #334155;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        ` : ''}
      `}</style>
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>📦 Components</h3>
        </div>
        <div className="sidebar-content blocks-container"></div>
      </div>
      
      <div className="main-editor">
        <div className="toolbar">
          <div className="toolbar-section panel__devices"></div>
          <div className="toolbar-divider"></div>
          <div className="toolbar-section panel__basic-actions"></div>
          <div className="toolbar-divider"></div>
          <div className="toolbar-section panel__export"></div>
        </div>
        <div id="gjs"></div>
      </div>
      
      <div className="properties-panel">
        <div className="properties-section">
          <div className="properties-section-header">⚙️ Settings</div>
          <div className="properties-section-content traits-container"></div>
        </div>
        <div className="properties-section">
          <div className="properties-section-header">🎨 Styles</div>
          <div className="properties-section-content styles-container"></div>
        </div>
      </div>
    </div>
  );
};

export default GrapesJSBuilder;