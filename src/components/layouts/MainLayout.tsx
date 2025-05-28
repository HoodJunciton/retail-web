import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

// Import layout variants
// import StandardLayout from './variants/StandardLayout'; // No longer used, AppTopBarLayout will be used instead
// import HorizontalLayout from './variants/HorizontalLayout'; // Old layout, no longer used here
import AppTopBarLayout from './variants/AppTopBarLayout'; // New layout
import MinimalLayout from './variants/MinimalLayout';
import FooterLayout from './variants/FooterLayout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { layoutVariant } = useSelector((state: RootState) => state.settings);

  // Render the appropriate layout based on the selected variant
  switch (layoutVariant) {
    case 'horizontal':
      // return <HorizontalLayout>{children}</HorizontalLayout>; // Old horizontal layout commented out as requested by swapping
      return <AppTopBarLayout>{children}</AppTopBarLayout>;
    case 'minimal':
      return <MinimalLayout>{children}</MinimalLayout>;
    case 'footer':
      return <FooterLayout>{children}</FooterLayout>;
    case 'standard':
    default:
      return <AppTopBarLayout>{children}</AppTopBarLayout>;
  }
}
