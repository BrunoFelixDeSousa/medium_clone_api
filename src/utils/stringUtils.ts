export function convertToSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-') +
    '-' +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  );
}
