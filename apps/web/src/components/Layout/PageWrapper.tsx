interface PageWWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWWrapperProps) {
  return (
    <div className="flex-grow min-h-0 p-4 overflow-y-auto">
      <div className="flex flex-col gap-4 flex-grow max-w-7xl w-full mx-auto shrink-0">
        {children}
      </div>
    </div>
  )
}