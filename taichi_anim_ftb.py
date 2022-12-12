import taichi as ti
import taichi_helper as th

ti.init(arch=ti.gpu)

n = 512

pixels = ti.Vector.field(3, ti.f32, shape=(n, n))

@ti.kernel
def render(t: ti.f32):
    for y, x in pixels:
        c = 0.0
        levels = 7
        for k in range(levels):
            block_size = 2 * 2 ** k

            yb = y + t
            xb = x + t

            p = yb % block_size / block_size
            q = xb % block_size / block_size

            yb = yb // block_size
            xb = xb // block_size

            brightness = (0.7 - ti.Vector([p - 0.5, q - 0.5]).norm()) * 2
            weight = 0.5 ** (levels - k - 1) * brightness
            
            c += th.frac(ti.sin(yb * 8 + xb * 42 + t * 1e-4 * 2 ** (levels - k - 1)) * 128) * weight
        pixels[y, x] = ti.Vector([1.0, 0.7, 0.8]) * c

gui = ti.GUI('太极程序动画', res=(n, n))

t = 0.0
while gui.running:
    t += 0.1
    render(t)
    gui.set_image(pixels)
    gui.show()