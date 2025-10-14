interface ExportReportData {
  timestamp: string;
  productId?: number;
  productName?: string;
  summary: {
    total: number;
    passed: number;
    failed: number;
  };
  results: Record<string, { status: string; comment: string }>;
}

export function exportReport(data: ExportReportData, filename?: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `validation-report-${data.productId || 'unknown'}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadValidationReport(
  productId: number | undefined,
  productName: string | undefined,
  validationResults: Record<string, { status: string; comment: string }>
) {
  const summary = {
    total: Object.keys(validationResults).length,
    passed: Object.values(validationResults).filter(r => r.status === 'pass').length,
    failed: Object.values(validationResults).filter(r => r.status === 'fail').length,
  };

  const report: ExportReportData = {
    timestamp: new Date().toISOString(),
    productId,
    productName,
    summary,
    results: validationResults,
  };

  exportReport(report);
}
