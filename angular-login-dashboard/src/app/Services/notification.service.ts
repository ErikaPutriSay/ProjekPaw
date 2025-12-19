import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  private createOverlay(message: string) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'rgba(0,0,0,0.35)';
    overlay.style.zIndex = '10000';

    const box = document.createElement('div');
    box.style.background = 'white';
    box.style.borderRadius = '6px';
    box.style.padding = '18px';
    box.style.maxWidth = '540px';
    box.style.boxShadow = '0 6px 18px rgba(0,0,0,0.2)';

    const p = document.createElement('div');
    p.style.marginBottom = '12px';
    p.style.color = '#111';
    p.style.fontSize = '15px';
    p.textContent = message;

    const btn = document.createElement('button');
    btn.textContent = 'OK';
    btn.style.padding = '8px 14px';
    btn.style.border = 'none';
    btn.style.background = '#0d6efd';
    btn.style.color = 'white';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', () => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    });

    box.appendChild(p);
    box.appendChild(btn);
    overlay.appendChild(box);
    return overlay;
  }

  private createConfirmOverlay(message: string, resolve: (v: boolean) => void) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'rgba(0,0,0,0.35)';
    overlay.style.zIndex = '10000';

    const box = document.createElement('div');
    box.style.background = 'white';
    box.style.borderRadius = '6px';
    box.style.padding = '18px';
    box.style.maxWidth = '540px';
    box.style.boxShadow = '0 6px 18px rgba(0,0,0,0.2)';

    const p = document.createElement('div');
    p.style.marginBottom = '12px';
    p.style.color = '#111';
    p.style.fontSize = '15px';
    p.textContent = message;

    const btnYes = document.createElement('button');
    btnYes.textContent = 'Ya';
    btnYes.style.padding = '8px 14px';
    btnYes.style.marginRight = '8px';
    btnYes.style.border = 'none';
    btnYes.style.background = '#198754';
    btnYes.style.color = 'white';
    btnYes.style.borderRadius = '4px';
    btnYes.style.cursor = 'pointer';

    const btnNo = document.createElement('button');
    btnNo.textContent = 'Tidak';
    btnNo.style.padding = '8px 14px';
    btnNo.style.border = 'none';
    btnNo.style.background = '#6c757d';
    btnNo.style.color = 'white';
    btnNo.style.borderRadius = '4px';
    btnNo.style.cursor = 'pointer';

    btnYes.addEventListener('click', () => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      resolve(true);
    });

    btnNo.addEventListener('click', () => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      resolve(false);
    });

    const footer = document.createElement('div');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'flex-end';
    footer.appendChild(btnYes);
    footer.appendChild(btnNo);

    box.appendChild(p);
    box.appendChild(footer);
    overlay.appendChild(box);
    return overlay;
  }

  confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const overlay = this.createConfirmOverlay(message, resolve);
        document.body.appendChild(overlay);
      } catch (e) {
        const ok = confirm(message);
        resolve(Boolean(ok));
      }
    });
  }

  /**
   * Menampilkan notifikasi overlay.
   * Parameter 'message' diubah menjadi 'any' agar bisa menerima 
   * string maupun object error dari HttpErrorResponse.
   */
  show(message: any) {
    try {
      let text = '';
      
      if (typeof message === 'string') {
        text = message;
      } else if (message && typeof message === 'object') {
        // Cek jika error dikirim dalam properti .error
        if (message.error && typeof message.error === 'string') {
          text = message.error;
        } 
        // Cek jika ini adalah object error standar yang punya properti .message
        else if (message.message && typeof message.message === 'string') {
          const m = message.message as string;
          if (m.includes('Http failure response')) {
            const status = (message as any).status;
            text = `Terjadi kesalahan jaringan atau server${status ? ' (kode ' + status + ')' : ''}`;
          } else {
            text = m;
          }
        } 
        // Cek jika hanya ada kode status
        else if ((message as any).status) {
          text = `Terjadi kesalahan jaringan atau server (kode ${(message as any).status})`;
        } 
        // Fallback terakhir: ubah objek ke JSON string
        else {
          try { 
            text = JSON.stringify(message); 
          } catch { 
            text = String(message); 
          }
        }
      } else {
        text = String(message);
      }

      const overlay = this.createOverlay(text);
      document.body.appendChild(overlay);
    } catch (e) {
      // Fallback ke alert bawaan browser jika DOM gagal dimanipulasi
      alert(typeof message === 'string' ? message : 'Terjadi kesalahan');
    }
  }
}