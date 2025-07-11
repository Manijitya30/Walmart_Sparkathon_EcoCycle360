import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../libs/apiCalls';
import { formatCurrency, formatDate, getDate } from '../libs';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState({ customer: true, orders: true, recyclables: true });
  const [error, setError] = useState({ customer: null, orders: null, recyclables: null });
  const [customer, setCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerRecyclables, setCustomerRecyclables] = useState([]);

  async function getCustomer() {
    try {
      const { status, data: res } = await api.get(`/user/${id}`);
      if (status === 200) setCustomer(res?.user || {});
    } catch (err) {
      setError((prev) => ({ ...prev, customer: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, customer: false }));
    }
  }

  async function getOrder() {
    try {
      const { status, data: result } = await api.get(`/orders/${id}`);
      if (status === 200) setCustomerOrders(result.orders);
    } catch (err) {
      setError((prev) => ({ ...prev, orders: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  }

  async function getRecyclables() {
    try {
      const { status, data: response } = await api.get(`/recyclables/${id}`);
      if (status === 200) setCustomerRecyclables(response.recycles);
    } catch (err) {
      setError((prev) => ({ ...prev, recyclables: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, recyclables: false }));
    }
  }

  useEffect(() => {
    getCustomer();
    getOrder();
    getRecyclables();
  }, []);

  if (loading.customer) return <div className="customer-detail-container">Loading customer data...</div>;

  if (error.customer)
    return (
      <div className="customer-detail-container customer-detail-error">
        {error.customer}
        <button onClick={() => navigate('/customers')}>Back to Customers</button>
      </div>
    );

  if (!customer) return <div className="customer-detail-container">Customer not found</div>;

  return (
    <div className="customer-detail-container">
      <button className="customer-detail-back-button" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Customers
      </button>

      <div className="customer-detail-profile-card">
        <div className="customer-detail-photo-container">
          <img
            src={
              customer.gender === 'Male'
                ? 'https://randomuser.me/api/portraits/men/1.jpg'
                : 'https://randomuser.me/api/portraits/women/3.jpg'
            }
            alt={customer.name}
            className="customer-detail-photo"
          />
          {customer.id % 2 === 1 && (
            <div className="customer-detail-premium-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="gold" stroke="gold">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
              </svg>
              Premium
            </div>
          )}
        </div>

        <div className="customer-name-id">
          <h1 className="customer-name1">{customer.name}</h1>
          <span className="customer-id">ID: {customer.id}</span>
        </div>

        <div className="customer-detail-meta">
          <span className="customer-detail-status">{customer.status || 'active'}</span>
          <span className="customer-detail-since">Member since: {formatDate(customer.dob)}</span>
        </div>

        <div className="customer-detail-section-card">
          <h3 className="customer-detail-section-title">Personal Information</h3>
          <div className="customer-detail-grid">
            <div className="customer-detail-item">
              <span className="customer-detail-label">Gender:</span>
              <span className="customer-detail-value">{customer.gender || 'Not specified'}</span>
            </div>
            <div className="customer-detail-item">
              <span className="customer-detail-label">Age:</span>
              <span className="customer-detail-value">{getDate(customer.dob)}</span>
            </div>
          </div>
        </div>

        <div className="customer-detail-section-card">
          <h3 className="customer-detail-section-title">Contact Information</h3>
          <div className="customer-detail-grid">
            <div className="customer-detail-item">
              <span className="customer-detail-label">Email:</span>
              <span className="customer-detail-value">
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </span>
            </div>
            <div className="customer-detail-item">
              <span className="customer-detail-label">Phone:</span>
              <span className="customer-detail-value">
                <a href={`tel:${customer.phone}`}>{customer.phone || '91-xxx95-xx58'}</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="customer-detail-section-card">
        <h3 className="customer-detail-section-title">
          Recent Orders {loading.orders && <span className="loading-badge">Loading...</span>}
        </h3>
        {error.orders ? (
          <div className="customer-detail-error">
            {error.orders}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : customerOrders.length > 0 ? (
          <div className="customer-detail-orders-table">
            <div className="customer-detail-orders-header">
              <span>Order ID</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Items</span>
            </div>
            {customerOrders.map((order) => (
              <div className="customer-detail-order-row" key={order.order_id}>
                <span>#{order.order_id}</span>
                <span>{formatDate(order.ordered_at)}</span>
                <span>{formatCurrency(order.amount)}</span>
                <span className="customer-detail-order-status">{order.status || 'processing'}</span>
                <span>{order.product_ids.length} items</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="customer-detail-no-data">No orders found.</div>
        )}
      </div>

      <div className="customer-detail-section-card">
        <h3 className="customer-detail-section-title">Recyclable Items</h3>
        {loading.recyclables ? (
          <p>Loading...</p>
        ) : error.recyclables ? (
          <div className="customer-detail-error">{error.recyclables}</div>
        ) : customerRecyclables.length === 0 ? (
          <p>No recyclable items found.</p>
        ) : (
          <div className="customer-detail-recycle-grid">
            {customerRecyclables.map((item) => (
              <div key={item.recycle_id} className="customer-detail-recycle-card">
                <h3>Recycle ID: #{item.recycle_id}</h3>
           <ul>
  <li>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
      <path d="M4 3h16v4H4z"></path>
      <path d="M7 7v13h10V7"></path>
    </svg>
    <strong>Plastic:</strong> {item.plastic} kg
  </li>
  <li>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
      <rect x="3" y="3" width="18" height="14" rx="2"></rect>
      <path d="M7 21h10"></path>
    </svg>
    <strong>E-Waste:</strong> {item.e_waste} kg
  </li>
  <li>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M4 4h16v6H4z"></path>
      <path d="M4 10v9.5"></path>
    </svg>
    <strong>Books:</strong> {item.books} kg
  </li>
  <li>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
      <path d="M4 4h16v16H4z"></path>
      <path d="M8 4v16"></path>
    </svg>
    <strong>Papers:</strong> {item.papers} kg
  </li>
  <li>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>
    <strong>Glass:</strong> {item.glass} kg
  </li>
  <li>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
      <path d="M4 4h16v6H4z"></path>
      <path d="M4 10l6 10h4l6-10"></path>
    </svg>
    <strong>Clothes:</strong> {item.clothes} kg
  </li>
</ul>

                <div className="recycle-meta">
                  <p><strong>Placed At:</strong> {formatDate(item.placed_at)}</p>
                  <p><strong>Address:</strong> {item.line1}, {item.city}, {item.state}, {item.country} - {item.postal_code}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
