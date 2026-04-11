import { Link } from 'react-router-dom'

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    e.target.reset()
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">
        <i className="fas fa-envelope me-2"></i>
        Contact Us
      </h1>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title mb-4">Get in Touch</h4>
              
              <div className="d-flex mb-4">
                <div className="me-3">
                  <div className="bg-primary rounded-circle p-3">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                </div>
                <div>
                  <h5>Phone</h5>
                  <p className="text-muted mb-0">+1 (555) 123-4567</p>
                  <small className="text-muted">Mon-Fri, 9AM-6PM EST</small>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3">
                  <div className="bg-success rounded-circle p-3">
                    <i className="fab fa-whatsapp text-white"></i>
                  </div>
                </div>
                <div>
                  <h5>WhatsApp</h5>
                  <p className="text-muted mb-0">+1 (555) 987-6543</p>
                  <small className="text-muted">Quick responses</small>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3">
                  <div className="bg-danger rounded-circle p-3">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                </div>
                <div>
                  <h5>Email</h5>
                  <p className="text-muted mb-0">support@shophub.com</p>
                  <small className="text-muted">We reply within 24 hours</small>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3">
                  <div className="bg-info rounded-circle p-3">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                </div>
                <div>
                  <h5>Address</h5>
                  <p className="text-muted mb-0">123 Commerce Street</p>
                  <small className="text-muted">New York, NY 10001</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Send us a Message</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <select className="form-select" required>
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-paper-plane me-2"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
