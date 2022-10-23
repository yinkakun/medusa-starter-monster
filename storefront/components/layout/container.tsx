interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-screen-2xl px-4 xl:px-8 ${className}`}
    >
      {children}
    </div>
  );
};
