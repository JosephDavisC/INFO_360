import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={{ position: 'absolute' }}
      icons={{
        success: undefined,
        error: undefined,
        info: undefined,
        warning: undefined,
        loading: undefined,
      }}
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#1a1a1a] group-[.toaster]:border-black/5 group-[.toaster]:shadow-[0_4px_20px_rgba(0,0,0,0.12)] group-[.toaster]:rounded-[14px]',
          description: 'group-[.toast]:text-[#888]',
          actionButton: 'group-[.toast]:bg-[#4B2E83] group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-[#F5F3EE] group-[.toast]:text-[#333]',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
