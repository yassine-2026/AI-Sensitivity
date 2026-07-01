export class ModelDownloader {
  private lastTime: number = performance.now();
  private lastLoadedBytes: number = 0;

  public handleProgress(
    progressInfo: any,
    onProgressUpdate: (progress: number, loaded: number, total: number, speed: number, remaining: number) => void,
    onReady: () => void,
    onLoading: () => void
  ) {
    if (progressInfo.status === 'progress') {
      const now = performance.now();
      const timeDiffSec = (now - this.lastTime) / 1000;
      const loadedDiff = progressInfo.loaded - this.lastLoadedBytes;
      
      let speed = 0;
      if (timeDiffSec > 0.5) {
        speed = loadedDiff / timeDiffSec;
        this.lastTime = now;
        this.lastLoadedBytes = progressInfo.loaded;
      }

      const timeRemaining = speed > 0 ? (progressInfo.total - progressInfo.loaded) / speed : 0;
      const progressPercent = progressInfo.progress || (progressInfo.loaded / progressInfo.total) * 100;

      onProgressUpdate(progressPercent, progressInfo.loaded, progressInfo.total, speed, timeRemaining);
    } else if (progressInfo.status === 'ready') {
      onReady();
    } else if (progressInfo.status === 'downloading') {
      onLoading();
    }
  }
}
