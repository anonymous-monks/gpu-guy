export const work = [
  {
    slug: "flashinfer-compilation",
    number: "01",
    title: "FlashInfer kernel compilation",
    short: "When a warm path still feels cold.",
    problem:
      "Repeated compilation and cache behavior in a direct-micro execution path.",
    focus:
      "Trace compilation flow, cache keys, launch ABI, and warm execution behavior.",
    validation:
      "Check cold and warm runs separately, verify cache reuse, and regression-test output correctness before making a performance claim.",
    tags: ["CuTe DSL", "Kernel caching", "CUDA", "Launch path"],
    sections: [
      [
        "The question",
        "Does repeated execution reuse the intended compiled artifact, or is a changing key, specialization, or execution path bringing compilation back into the hot path?",
      ],
      [
        "The investigation",
        "Separate process startup, compilation, and warm execution. Inspect cache-key construction, shape and dtype specialization, device and toolchain assumptions, and the host-to-device launch boundary. Verify the launch ABI before interpreting timing changes.",
      ],
      [
        "The validation plan",
        "Run identical inputs across cold and warm cache states. Test intended shape transitions and confirm cache invalidation still occurs when it should. Compare outputs with a trusted reference and record synchronization policy, software versions, GPU, and workload for every measurement.",
      ],
      [
        "Evidence to attach",
        "A reproducible benchmark, the relevant public issue or PR, environment details, correctness tests, and cold-versus-warm measurements. No speedup or contribution is asserted until that evidence is published.",
      ],
    ],
  },
  {
    slug: "vllm-serving",
    number: "02",
    title: "vLLM serving investigation",
    short: "The workload changed. The latency did too.",
    problem:
      "Unexpected inference latency behavior during workload transitions.",
    focus:
      "Follow request scheduling, shape transitions, prefill/decode balance, and GPU execution.",
    validation:
      "Compare latency distributions and throughput under a fixed, representative workload; capture queue time and memory behavior alongside device traces.",
    tags: ["TTFT", "Runtime profiling", "Shape transitions", "Serving"],
    sections: [
      [
        "The question",
        "When request lengths or concurrency change, is the latency increase caused by queueing, prefill work, compilation, memory pressure, communication, or a change in GPU execution?",
      ],
      [
        "The investigation",
        "Record the model, runtime version, precision, parallelism settings, hardware, and request mix. Correlate request-level TTFT and inter-token latency with scheduler activity and a device timeline. Check for changing shapes, compilation boundaries, KV-cache pressure, and communication stalls.",
      ],
      [
        "The validation plan",
        "Replay a representative mix of input and output lengths at controlled offered load. Separate queue time from execution. Compare P50, P95, and P99 alongside achieved throughput, error rates, memory usage, and output correctness. Repeat runs and include warmup details.",
      ],
      [
        "Evidence to attach",
        "A reproducible load script, serving configuration, trace excerpts, a public issue or PR where appropriate, and measurements from a documented environment. This outline does not claim a completed client engagement or measured improvement.",
      ],
    ],
  },
];
