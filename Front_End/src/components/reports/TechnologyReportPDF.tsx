import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Technology } from '@/utils/detectTechnologies';

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
  techList: {
    marginTop: 10,
  },
  techItem: {
    marginBottom: 10,
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 4,
  },
  techName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  techDetail: {
    fontSize: 12,
    color: '#666',
  },
  badge: {
    fontSize: 10,
    padding: '2px 6px',
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginTop: 5,
  },
});

interface TechnologyReportPDFProps {
  url: string;
  technologies: Technology[];
}

export function TechnologyReportPDF({ url, technologies }: TechnologyReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Technology Detection Report</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>URL</Text>
              <Text style={styles.value}>{url}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detected Technologies</Text>
          <View style={styles.techList}>
            {technologies.map((tech, index) => (
              <View key={index} style={styles.techItem}>
                <Text style={styles.techName}>{tech.name}</Text>
                <Text style={styles.techDetail}>Category: {tech.category}</Text>
                <Text style={styles.techDetail}>Confidence: {tech.confidence}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.techDetail}>
            Total technologies detected: {technologies.length}
          </Text>
          <Text style={styles.techDetail}>
            Frameworks: {technologies.filter(t => t.category === 'framework').length}
          </Text>
          <Text style={styles.techDetail}>
            CMS: {technologies.filter(t => t.category === 'cms').length}
          </Text>
          <Text style={styles.techDetail}>
            Libraries: {technologies.filter(t => t.category === 'library').length}
          </Text>
          <Text style={styles.techDetail}>
            Analytics: {technologies.filter(t => t.category === 'analytics').length}
          </Text>
          <Text style={styles.techDetail}>
            Hosting: {technologies.filter(t => t.category === 'hosting').length}
          </Text>
        </View>
      </Page>
    </Document>
  );
} 