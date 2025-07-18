import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ScanAlert } from '@/type';
import { Technology } from '@/utils/detectTechnologies';

interface AlertWithTechnologies extends ScanAlert {
  urlTechnologies?: Record<string, Technology[]>
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  gridItem: {
    width: '50%',
    padding: 10,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#000',
  },
  alert: {
    marginBottom: 20,
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  alertRisk: {
    fontSize: 12,
    color: '#dc2626',
  },
  alertDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  alertDetail: {
    fontSize: 12,
    marginBottom: 5,
  },
  alertUrl: {
    fontSize: 12,
    color: '#2563eb',
    marginBottom: 5,
  },
  techList: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  techItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  techCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  techConfidence: {
    fontSize: 12,
    color: '#059669',
  },
});

interface TechnicalReportPDFProps {
  alerts: AlertWithTechnologies[];
  targetInfo: {
    url: string;
    webServer: string;
    ipAddress: string;
  };
}

export function TechnicalReportPDF({ alerts, targetInfo }: TechnicalReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Technical Security Report</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>URL</Text>
              <Text style={styles.value}>{targetInfo.url}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Web Server</Text>
              <Text style={styles.value}>{targetInfo.webServer}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>IP Address</Text>
              <Text style={styles.value}>{targetInfo.ipAddress}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Alerts</Text>
          {alerts.map((alert, index) => (
            <View key={index} style={styles.alert}>
              <View style={styles.alertHeader}>
                <Text style={styles.alertTitle}>{alert.name}</Text>
                <Text style={styles.alertRisk}>Risk: {alert.risk}</Text>
              </View>
              <Text style={styles.alertDescription}>{alert.description}</Text>
              <Text style={styles.alertDetail}>Method: {alert.method}</Text>
              <Text style={styles.alertDetail}>Confidence: {alert.confidence}</Text>
              <Text style={styles.alertDetail}>Solution: {alert.solution}</Text>
              
              {alert.urls && alert.urls.length > 0 && (
                <View style={styles.techList}>
                  <Text style={styles.sectionTitle}>Affected URLs and Technologies</Text>
                  {alert.urls.map((url, urlIndex) => (
                    <View key={urlIndex}>
                      <Text style={styles.alertUrl}>{url}</Text>
                      {alert.urlTechnologies?.[url]?.map((tech, techIndex) => (
                        <View key={techIndex} style={styles.techItem}>
                          <Text style={styles.techItem}>{tech.name}</Text>
                          <Text style={styles.techCategory}>Category: {tech.category}</Text>
                          <Text style={styles.techConfidence}>Confidence: {tech.confidence}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
} 