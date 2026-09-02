interface PageWWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWWrapperProps) {
  return (
    <div className="flex flex-col flex-grow gap-4 p-4">
      {children}
    </div>
  )
}