import * as THREE from "three";

export interface WhalePathState {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  tailBend: number;
}

/**
 * Calculates deterministic trajectory for whale swimming in designated outer lanes.
 * Lane 0: Right lane (x: 8..16, z: -10..-25), with occasional breach jumps.
 * Lane 1: Deep ocean background loop (x: -16..-8, y: -15..-30, z: -15..-30).
 */
export function calculateWhaleTrajectory(
  lane: number,
  time: number,
  jumpOffset: number
): WhalePathState {
  const pos = new THREE.Vector3();
  const rot = new THREE.Euler();
  let tailBend = Math.sin(time * 2.2) * 0.28;

  if (lane === 0) {
    // Surface / Waterline Right Lane (Never intersects hero typography panel at x: -10..+4)
    const cycle = (time * 0.12 + jumpOffset) % 1.0; // 0 to 1 loop
    const angle = cycle * Math.PI * 2;

    // Elliptical orbit on the right edge of the stage
    pos.x = 11 + Math.cos(angle) * 5;
    pos.z = -12 + Math.sin(angle) * 8;

    // Base swimming depth around y = -0.5..-3
    let baseDepth = -1.5 + Math.sin(time * 0.8) * 0.8;

    // Check for occasional breach jump (every 30s)
    const jumpCycle = (time * 0.033) % 1.0;
    if (jumpCycle > 0.85) {
      // In breach jump phase: rise above waterline y = 0 up to y = 3.5, then re-enter
      const jumpProgress = (jumpCycle - 0.85) / 0.15; // 0 to 1
      const jumpHeight = Math.sin(jumpProgress * Math.PI) * 4.5;
      baseDepth += jumpHeight;

      // Pitch up during ascent, pitch down during splashdown
      rot.x = (0.5 - jumpProgress) * 0.8;
      tailBend = Math.sin(time * 4) * 0.45;
    } else {
      rot.x = Math.sin(time * 0.8) * 0.1;
    }

    pos.y = baseDepth;
    rot.y = -angle + Math.PI / 2;
    rot.z = Math.sin(time * 1.5) * 0.08;
  } else {
    // Deep Ocean Background Lane (Zone 3-4, y: -12..-28)
    const cycle = (time * 0.08 + jumpOffset) % 1.0;
    const angle = cycle * Math.PI * 2;

    pos.x = -12 + Math.cos(angle) * 7;
    pos.y = -18 + Math.sin(time * 0.5) * 3;
    pos.z = -18 + Math.sin(angle) * 9;

    rot.y = -angle + Math.PI / 2;
    rot.x = Math.sin(time * 0.5) * 0.15;
    rot.z = Math.cos(time * 1.2) * 0.05;
  }

  return { position: pos, rotation: rot, tailBend };
}
