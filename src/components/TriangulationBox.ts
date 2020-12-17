import addon from '../../build/Release/earcut.node';
import ITriangulationBox from './TriangulationBox';

class TriangulationBox implements ITriangulationBox {
  private x: number = 1;
  private y: number = 1;
  private z: number = 1;
  private vertices: number[][] = [];
  private triangles: number[] = [];

  constructor(width: number, height: number, dept: number) {
    this.x = width / 2;
    this.y = height / 2;
    this.z = dept / 2;
    this.setVertices();
    this.setTriangles();
  }
  setWidth(width: number) {
    this.x = width / 2;
  }

  getWidth() {
    return this.x * 2;
  }

  setHeight(height: number) {
    this.y = height / 2;
  }

  getHeight() {
    return this.y * 2;
  }

  setDept(dept: number) {
    this.z = dept / 2;
  }

  getDept() {
    return this.z * 2;
  }

  getTriangles() {
    return this.triangles;
  }

  getVertices() {
    return this.vertices;
  }

  private setVertices() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    this.vertices = [
      [-x, -y,  z],
      [ x, -y,  z],
      [ x,  y,  z],
      [-x,  y,  z],
      [-x,  y, -z],
      [ x,  y, -z],
      [ x, -y, -z],
      [-x, -y, -z],
    ];
  }

  private setTriangles() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    this.triangles = [
      ...addon.earcut([-x, -y, x, -y, x, y, -x, y]),
      ...addon.earcut([x, z, -x, z, -x, -z, x, -z])
        .map(item => item + 2),
      ...addon.earcut([-x, y, x, y, x, -y, -x, -y])
        .map(item => item + 4),
      ...addon.earcut([x, -z, -x, -z, -x, z, x, z])
        .map(item => item < 1 ? item + 6 : item),
      ...addon.earcut([-y, z, y, z, y, -z, -y, -z])
        .map(item => item === 1 ? 3 : item === 2 ? 4 : item === 3 ? 7 : item),
      ...addon.earcut([-y, z, y, z, y, -z, -y, -z])
        .map(item => item < 1 ? item + 1 : item + 3),
    ];
  }
}

export default TriangulationBox;