import { Order } from './store'

export function generateOrderPDF(order: Order) {
  // Create PDF content as HTML string
  const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Sipariş Detayı - ${order.id}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #3B82F6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #3B82F6;
          margin: 0;
          font-size: 28px;
        }
        .header p {
          color: #6B7280;
          margin: 5px 0 0 0;
        }
        .order-info {
          background: #F8FAFC;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .info-item {
          margin-bottom: 15px;
        }
        .info-label {
          font-weight: 600;
          color: #374151;
          display: block;
          margin-bottom: 5px;
        }
        .info-value {
          color: #6B7280;
        }
        .status {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status.pending {
          background: #FEF3C7;
          color: #92400E;
        }
        .status.in_progress {
          background: #DBEAFE;
          color: #1E40AF;
        }
        .status.completed {
          background: #D1FAE5;
          color: #065F46;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h3 {
          color: #374151;
          border-bottom: 2px solid #E5E7EB;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .pages-list, .features-list {
          list-style: none;
          padding: 0;
        }
        .pages-list li, .features-list li {
          background: #F9FAFB;
          padding: 10px 15px;
          margin-bottom: 8px;
          border-radius: 6px;
          border-left: 4px solid #3B82F6;
        }
        .feature-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .feature-price {
          font-weight: 600;
          color: #059669;
        }
        .about-content {
          margin-top: 15px;
        }
        .about-content p {
          font-size: 14px;
          line-height: 1.6;
          color: #374151;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .total-section {
          background: #1F2937;
          color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .total-amount {
          font-size: 32px;
          font-weight: bold;
          color: #10B981;
        }
        .notes {
          background: #FEF7CD;
          border: 1px solid #F59E0B;
          padding: 15px;
          border-radius: 6px;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #E5E7EB;
          color: #6B7280;
          font-size: 14px;
        }
        @media print {
          body { margin: 0; padding: 15px; }
          .header { page-break-after: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>WebBuilder Pro</h1>
        <p>Sipariş Detay Raporu</p>
      </div>

      <div class="order-info">
        <div class="info-grid">
          <div>
            <div class="info-item">
              <span class="info-label">Sipariş No:</span>
              <span class="info-value">#${order.id}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Müşteri Adı:</span>
              <span class="info-value">${order.customer_name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">E-posta:</span>
              <span class="info-value">${order.customer_email}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Telefon:</span>
              <span class="info-value">${order.customer_phone}</span>
            </div>
          </div>
          <div>
            <div class="info-item">
              <span class="info-label">Website Türü:</span>
              <span class="info-value">${order.website_type}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Durum:</span>
              <span class="status ${order.status}">
                ${order.status === 'pending' ? 'Beklemede' : 
                  order.status === 'in_progress' ? 'Devam Ediyor' : 
                  order.status === 'completed' ? 'Tamamlandı' : order.status}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Sipariş Tarihi:</span>
              <span class="info-value">${new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Güncelleme Tarihi:</span>
              <span class="info-value">${new Date(order.updated_at).toLocaleDateString('tr-TR')}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Seçilen Sayfalar</h3>
        <ul class="pages-list">
          ${(() => {
            // Güvenli selected_pages erişimi
            let selectedPages = order.selected_pages || order.selectedPages || []

            // Eğer string ise JSON parse et
            if (typeof selectedPages === 'string') {
              try {
                selectedPages = JSON.parse(selectedPages)
              } catch (e) {
                selectedPages = []
              }
            }

            // Array değilse boş array yap
            if (!Array.isArray(selectedPages)) {
              selectedPages = []
            }

            return selectedPages.length > 0
              ? selectedPages.map(page => `<li>${page}</li>`).join('')
              : '<li>Seçilen sayfa bulunmuyor</li>'
          })()}
        </ul>
      </div>

      <div class="section">
        <h3>Seçilen Özellikler</h3>
        <ul class="features-list">
          ${(() => {
            // Güvenli selected_features erişimi
            let selectedFeatures = order.selected_features || order.additional_features || []

            // Eğer string ise JSON parse et
            if (typeof selectedFeatures === 'string') {
              try {
                selectedFeatures = JSON.parse(selectedFeatures)
              } catch (e) {
                selectedFeatures = []
              }
            }

            // Array değilse boş array yap
            if (!Array.isArray(selectedFeatures)) {
              selectedFeatures = []
            }

            return selectedFeatures.length > 0
              ? selectedFeatures.map(feature => `
                <li>
                  <div class="feature-item">
                    <span>${typeof feature === 'string' ? feature : (feature.name || feature.id || 'Bilinmeyen Özellik')}</span>
                    <span class="feature-price">₺${typeof feature === 'object' && feature.price ? feature.price.toLocaleString('tr-TR') : '0'}</span>
                  </div>
                </li>
              `).join('')
              : '<li>Seçilen özellik bulunmuyor</li>'
          })()}
        </ul>
      </div>

      ${(() => {
        // Güvenli special_requests/knowledge_text erişimi
        const aboutText = order.special_requests || order.knowledge_text || order.notes || ''

        return aboutText.trim() ? `
          <div class="section">
            <h3>Hakkınızda, İş Tecrübeleriniz ve Özel İstekleriniz</h3>
            <div class="about-content">
              <div class="about-subsection">
                <h4 style="color: #374151; margin-bottom: 10px; font-size: 16px;">📋 Kişisel ve Mesleki Bilgiler</h4>
                <div style="background-color: #f8f9fa; border-left: 4px solid #007bff; border-radius: 4px; padding: 15px; margin-bottom: 20px;">
                  <p style="line-height: 1.6; margin: 0; color: #374151;">
                    ${aboutText.replace(/\n/g, '<br>')}
                  </p>
                </div>
              </div>

              <div class="about-categories">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 20px;">
                  <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <h5 style="color: #1e40af; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">💼 Deneyimleriniz</h5>
                    <p style="color: #374151; font-size: 12px; margin: 0; line-height: 1.4;">
                      Eğitim durumu, çalıştığınız yerler, deneyim süresi gibi bilgiler
                    </p>
                  </div>

                  <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <h5 style="color: #059669; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">💡 Uzmanlık Alanları</h5>
                    <p style="color: #374151; font-size: 12px; margin: 0; line-height: 1.4;">
                      Özel branşlarınız, sertifikalarınız, yetenekleriniz
                    </p>
                  </div>

                  <div style="background-color: #faf5ff; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                    <h5 style="color: #7c3aed; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">👥 Çalışma Şekli</h5>
                    <p style="color: #374151; font-size: 12px; margin: 0; line-height: 1.4;">
                      Çalışma saatleri, randevu sistemi, ekip bilgileri
                    </p>
                  </div>
                </div>
              </div>

              <div style="background-color: #fef7cd; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <h5 style="color: #92400e; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">ℹ️ Bu Bilgiler Website'nizde Nasıl Kullanılacak?</h5>
                <p style="color: #92400e; font-size: 12px; margin: 0; line-height: 1.4;">
                  Yukarıda paylaştığınız bilgiler, website'nizin "Hakkımızda" sayfasında, hizmet tanıtımlarında ve
                  profesyonel profilinizde kullanılarak ziyaretçilerinize güven vermeyi amaçlar.
                </p>
              </div>
            </div>
          </div>
        ` : ''
      })()}

      <div class="total-section">
        <h3 style="margin-top: 0; color: white;">Toplam Tutar</h3>
        <div class="total-amount">₺${(order.total_price || order.totalPrice || 0).toLocaleString('tr-TR')}</div>
      </div>

      ${order.notes ? `
        <div class="notes">
          <strong>Notlar:</strong><br>
          ${order.notes}
        </div>
      ` : ''}

      <div class="footer">
        <p>Bu rapor ${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.</p>
        <p>WebBuilder Pro - Profesyonel Web Sitesi Çözümleri</p>
      </div>
    </body>
    </html>
  `

  // Create and download PDF
  const blob = new Blob([pdfContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  // Create a temporary link and click it to download
  const link = document.createElement('a')
  link.href = url
  link.download = `siparis-${order.id}-${order.customer_name.replace(/\s+/g, '-').toLowerCase()}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  // Also open in new window for printing as PDF
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(pdfContent)
    printWindow.document.close()
    
    // Auto print after content loads
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }
}

export function generateAllOrdersPDF(orders: Order[]) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0)
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Tüm Siparişler Raporu</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #3B82F6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .summary-card {
          background: #F8FAFC;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border-left: 4px solid #3B82F6;
        }
        .summary-number {
          font-size: 24px;
          font-weight: bold;
          color: #3B82F6;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #E5E7EB;
        }
        th {
          background: #F9FAFB;
          font-weight: 600;
          color: #374151;
        }
        .status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .status.pending { background: #FEF3C7; color: #92400E; }
        .status.in_progress { background: #DBEAFE; color: #1E40AF; }
        .status.completed { background: #D1FAE5; color: #065F46; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>WebBuilder Pro</h1>
        <p>Tüm Siparişler Raporu - ${new Date().toLocaleDateString('tr-TR')}</p>
      </div>

      <div class="summary">
        <div class="summary-card">
          <div class="summary-number">${orders.length}</div>
          <div>Toplam Sipariş</div>
        </div>
        <div class="summary-card">
          <div class="summary-number">₺${totalRevenue.toLocaleString('tr-TR')}</div>
          <div>Toplam Gelir</div>
        </div>
        <div class="summary-card">
          <div class="summary-number">${statusCounts.pending || 0}</div>
          <div>Bekleyen</div>
        </div>
        <div class="summary-card">
          <div class="summary-number">${statusCounts.completed || 0}</div>
          <div>Tamamlanan</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sipariş No</th>
            <th>Müşteri</th>
            <th>Tür</th>
            <th>Durum</th>
            <th>Tutar</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(order => `
            <tr>
              <td>#${order.id}</td>
              <td>
                <div>${order.customer_name}</div>
                <div style="font-size: 12px; color: #6B7280;">${order.customer_email}</div>
              </td>
              <td>${order.website_type}</td>
              <td>
                <span class="status ${order.status}">
                  ${order.status === 'pending' ? 'Beklemede' : 
                    order.status === 'in_progress' ? 'Devam Ediyor' : 
                    order.status === 'completed' ? 'Tamamlandı' : order.status}
                </span>
              </td>
              <td>₺${order.total_price.toLocaleString('tr-TR')}</td>
              <td>${new Date(order.created_at).toLocaleDateString('tr-TR')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `

  const blob = new Blob([pdfContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `tum-siparisler-${new Date().toISOString().split('T')[0]}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(pdfContent)
    printWindow.document.close()
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }
}
