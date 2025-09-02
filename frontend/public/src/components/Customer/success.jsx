import { useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sid = query.get("session_id");

    if (sid) {
      // Save session ID to localStorage array of session IDs
      const storedSessions = JSON.parse(localStorage.getItem("session_ids") || "[]");

      if (!storedSessions.includes(sid)) {
        storedSessions.push(sid);
        localStorage.setItem("session_ids", JSON.stringify(storedSessions));
      }
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5001/api/stripe/checkout-session?sessionId=${sessionId}`
        );
        setSession(data.session);
        setPaymentIntent(data.paymentIntent);
      } catch (error) {
        console.error("Error retrieving session:", error);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  if (!session || !paymentIntent) return <div>Loading...</div>;

  const paymentMethod =
    paymentIntent.payment_method_types && paymentIntent.payment_method_types.length > 0
      ? paymentIntent.payment_method_types[0]
      : "N/A";

  const lineItems = session.line_items?.data || [];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 Payment Successful</h1>
        <p>
          Thank you, <strong>{session.customer_details?.name || "Customer"}</strong>!
        </p>
        <p>
          Your payment of <strong>₹{(paymentIntent.amount / 100).toFixed(2)}</strong> was successful.
        </p>
        <p>
          <strong>Status:</strong> {paymentIntent.status}
        </p>
        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
        <p>
          <strong>Stripe Payment ID:</strong> {paymentIntent.id}
        </p>

        <hr style={styles.divider} />
        <h2 style={styles.subtitle}>🧾 Receipt</h2>
        <ul style={styles.itemList}>
          {lineItems.map((item, idx) => (
            <li key={idx} style={styles.item}>
              <span>
                {item.quantity} x {item.description}
              </span>
              <span>₹{(item.amount_total / 100).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <hr style={styles.divider} />
        <p style={styles.total}>
          <strong>Total Paid:</strong> ₹{(paymentIntent.amount / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0f4f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "16px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    color: "#2e7d32",
  },
  subtitle: {
    marginTop: "1.5rem",
    fontSize: "1.2rem",
  },
  divider: {
    margin: "1rem 0",
  },
  itemList: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  total: {
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
};

export default Success;
