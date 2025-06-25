import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  label: { fontSize: 12, marginBottom: 2, fontWeight: "bold" },
  value: { fontSize: 12, marginBottom: 5 },
  signature: { marginTop: 10, height: 50, width: 200 },
});

type BookingPDFProps = {
  data: {
    dateRange: [Date, Date] | null;
    eventType: string;
    guests: number;
    description: string
    otherInfo: string;
    signature: string;
  };
};

const BookingPDF: React.FC<BookingPDFProps> = ({ data }) => {
  const [startDate, endDate] = data.dateRange || [null, null];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Booking Confirmation</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Event Type:</Text>
          <Text style={styles.value}>{data.eventType}</Text>

          <Text style={styles.label}>Guests:</Text>
          <Text style={styles.value}>{data.guests}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{data.description}</Text>

          <Text style={styles.label}>Other Info:</Text>
          <Text style={styles.value}>{data.otherInfo}</Text>

          {startDate && endDate && (
            <>
              <Text style={styles.label}>Date Range:</Text>
              <Text style={styles.value}>
                {startDate.toDateString()} to {endDate.toDateString()}
              </Text>
            </>
          )}
        </View>

        {data.signature && (
          <View style={styles.section}>
            <Text style={styles.label}>Signature:</Text>
            <Image src={data.signature} style={styles.signature} />
          </View>
        )}
      </Page>
    </Document>
  );
};

export default BookingPDF;
