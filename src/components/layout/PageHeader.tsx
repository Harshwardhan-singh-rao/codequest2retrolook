interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-text-primary sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-1 text-text-secondary">{description}</p>
      )}
    </div>
  );
}
