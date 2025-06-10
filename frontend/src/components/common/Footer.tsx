import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, Stack, useTheme, useMediaQuery } from '@mui/material';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const socialLinks = [
    { icon: <Facebook size={24} />, url: '#', label: 'Facebook' },
    { icon: <Twitter size={24} />, url: '#', label: 'Twitter' },
    { icon: <Instagram size={24} />, url: '#', label: 'Instagram' },
    { icon: <Linkedin size={24} />, url: '#', label: 'LinkedIn' },
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'Press', url: '/press' },
        { label: 'Blog', url: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Safety Tips', url: '/safety' },
        { label: 'Travel Guides', url: '/guides' },
        { label: 'FAQs', url: '/faq' },
        { label: 'Community Guidelines', url: '/guidelines' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Cookie Policy', url: '/cookies' },
        { label: 'Accessibility', url: '/accessibility' },
      ],
    },
  ];

  return (
    <Box 
      component="footer" 
      sx={{
        py: 6,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and company info */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Logo />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Connect with like-minded travelers worldwide and find your perfect travel companion for your next adventure.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {socialLinks.map((social, index) => (
                  <Link 
                    key={index}
                    href={social.url}
                    color="inherit"
                    aria-label={social.label}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                      }
                    }}
                  >
                    {social.icon}
                  </Link>
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <Grid item xs={12} sm={4} md={2} key={index}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {section.title}
              </Typography>
              <Stack spacing={1.5}>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.url}
                    underline="none"
                    color="text.secondary"
                    sx={{
                      '&:hover': {
                        color: 'primary.main',
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Contact and newsletter */}
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Contact
            </Typography>
            <Stack spacing={1.5}>
              <Link
                href="mailto:info@travelmate.com"
                underline="none"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
                <Mail size={16} />
                <span>Contact Us</span>
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'left'}>
            © {new Date().getFullYear()} TravelMate. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for travelers worldwide
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;