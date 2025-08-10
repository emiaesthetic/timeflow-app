import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      style={
        {
          '--normal-bg': 'var(--toaster-normal-bg)',
          '--normal-text': 'var(--toaster-normal-text)',
          '--normal-border': 'var(--toaster-normal-border)',
          '--success-bg': 'var(--toaster-success-bg)',
          '--success-text': 'var(--toaster-success-text)',
          '--error-bg': 'var(--toaster-error-bg)',
          '--error-text': 'var(--toaster-error-text)',
          '--warning-bg': 'var(--toaster-warning-bg)',
          '--warning-text': 'var(--toaster-warning-text)',
        } as React.CSSProperties
      }
      className="toaster group backdrop-blur-md"
      position="top-right"
      duration={3000}
      richColors
      toastOptions={{
        className: 'font-sans shadow-lg !border-0',
      }}
      {...props}
    />
  );
}

export { Toaster };
