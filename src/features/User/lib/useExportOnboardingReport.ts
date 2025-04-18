import { useMutation } from '@tanstack/react-query';
import { exportOnboardingReport } from '../api';
import { useSnackbar } from 'shared/ui';

export const useExportOnboardingReport = () => {
  const snackbar = useSnackbar();

  return useMutation({
    mutationFn: () => exportOnboardingReport(),
    onSuccess: (data) => {
      console.log('DATA TYPE:', data instanceof Blob); // должен быть true
      console.log('BLOB SIZE:', data.size); // долже
      const blob = new Blob([data], { type: 'application/pdf' });

      console.log('DATA TYPE:', blob instanceof Blob); // должен быть true
      console.log('BLOB SIZE:', blob.size); // должен быть > 0

      const blobUrl = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = 'onboarding_report.pdf';
      anchor.style.display = 'none';

      document.body.appendChild(anchor);
      anchor.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(anchor);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    },
    onError: (error) => {
      console.log(error, 'error');

      snackbar('Не удалось экспортировать отчет, попробуйте позже', 'error');
    },
  });
};
