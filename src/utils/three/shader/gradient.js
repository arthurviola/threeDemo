const vertexShader = `
                        varying vec3 vNormal;
                        varying vec3 vPosition;
                            void main() {
                            //将attributes的normal通过varying赋值给了向量vNormal
                            vNormal = normal;
                            vPosition = position;
                                //projectionMatrix是投影变换矩阵 modelViewMatrix是相机坐标系的变换矩阵
                            gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y, position.z, 1.0 );
                        }
                `
const fragmentShader = `
                        varying vec3 vNormal;
                        varying vec3 vPosition;
                        uniform float step;
                        uniform vec3 beginColor;
                        uniform vec3 endColor;
                        uniform float beginTransparency;
                        uniform float endTransparency;
                        uniform float minY;
                        void main() {
                            // 渐变算法 公式：Gradient = RStart+ (REnd-RStart) / Step * N （第N步的颜色rgb中R的值）
                            // https://www.jb51.net/article/109044.htm?tdsourcetag=s_pctim_aiomsg
                            float r = (beginColor.x + (endColor.x - beginColor.x) /step * (vPosition.y - minY)) / 255.0  ;
                            float g = (beginColor.y + (endColor.y - beginColor.y) /step * (vPosition.y - minY))  / 255.0;
                            float b = (beginColor.z + (endColor.z - beginColor.z) /step * (vPosition.y - minY)) /255.0;
                            float a = (beginTransparency + (endTransparency - beginTransparency)  / step * (vPosition.y - minY));
                            gl_FragColor = vec4(r,g,b, a);
                        }`

export { vertexShader , fragmentShader }
