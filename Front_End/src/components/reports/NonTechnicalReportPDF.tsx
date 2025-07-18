import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { NonTechnicalReport } from '@/type';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  alertContainer: {
    marginBottom: 20,
    padding: 15,
    border: '1 solid #e5e7eb',
    borderRadius: 4
  },
  alertHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  riskBadge: {
    padding: '2 8',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#374151',
    lineHeight: 1.5
  }
});

interface NonTechnicalReportPDFProps {
  reports: NonTechnicalReport[];
  targetInfo: {
    url: string;
    webServer: string;
    ipAddress: string;
  };
}

export const NonTechnicalReportPDF = ({ reports, targetInfo }: NonTechnicalReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Non-Technical Security Report</Text>
        <Text style={styles.text}>Target: {targetInfo.url}</Text>
        <Text style={styles.text}>Server: {targetInfo.webServer}</Text>
        <Text style={styles.text}>IP Address: {targetInfo.ipAddress}</Text>
      </View>

      {reports.map((report, index) => (
        <View key={index} style={styles.alertContainer}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>{report.name}</Text>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(report.risk) }]}>
              <Text style={{ color: '#ffffff' }}>{report.risk}</Text>
            </View>
          </View>
          <Text style={styles.text}>{report.description}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'low':
      return '#3b82f6';
    default:
      return '#6b7280';
  }
}; 