// Task-only public contact details. Keep personal accounts out of this file.
export const EMAIL = "all.season.anonymous.monkey@gmail.com";
export const GITHUB_URL = "https://github.com/anonymous-monks/gpu-guy";
const body =
  "Hello,\n\nModel:\nGPU:\nServing stack:\nCurrent latency/throughput:\nMain problem:\nTarget:\n";
export const inquiryHref = `mailto:${EMAIL}?subject=${encodeURIComponent("LLM Inference Optimization Inquiry")}&body=${encodeURIComponent(body)}`;
export const auditHref = `mailto:${EMAIL}?subject=${encodeURIComponent("GPU / LLM Performance Audit")}&body=${encodeURIComponent(body)}`;
