logos = [
    ("electronics", "ELECTRONIX", "circuit"),
    ("construction", "БЕТОНГРАД", "brick"),
    ("education", "EDUFLOW", "book"),
    ("b2b-services", "IT.SIGMA", "cloud"),
    ("retail", "TRADEMARK", "shop"),
    ("logistics", "CARGO+", "truck"),
    ("realestate", "ЖК ПРЕМЬЕР", "home"),
    ("beauty", "STUDIO NOVA", "star"),
]
for slug, name, icon_type in logos:
    # SVG стилизован под приглушённый лого — тёмно-серый на белом
    if icon_type == "circuit":
        icon = '<circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="2"/><rect x="20" y="20" width="8" height="8" fill="currentColor"/>'
    elif icon_type == "brick":
        icon = '<rect x="12" y="14" width="24" height="8" fill="currentColor"/><rect x="16" y="26" width="24" height="8" fill="currentColor" opacity="0.6"/>'
    elif icon_type == "book":
        icon = '<path d="M12 14v20l12-4 12 4V14L24 18 12 14z" fill="currentColor"/>'
    elif icon_type == "cloud":
        icon = '<path d="M15 30a6 6 0 0 1 0-12 8 8 0 0 1 16 0 6 6 0 0 1 0 12H15z" fill="currentColor"/>'
    elif icon_type == "shop":
        icon = '<path d="M14 18l2-6h16l2 6M14 18v14h20V18M14 18h20" fill="none" stroke="currentColor" stroke-width="2.5"/>'
    elif icon_type == "truck":
        icon = '<rect x="8" y="18" width="20" height="12" fill="currentColor"/><path d="M28 22h8l4 4v4h-12z" fill="currentColor" opacity="0.7"/><circle cx="16" cy="34" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="34" cy="34" r="3" fill="none" stroke="currentColor" stroke-width="2"/>'
    elif icon_type == "home":
        icon = '<path d="M24 10L10 22v14h10v-8h8v8h10V22z" fill="currentColor"/>'
    elif icon_type == "star":
        icon = '<path d="M24 8l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="currentColor"/>'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48" fill="none">
  <g transform="translate(4, 0)" style="color:#666">
    {icon}
  </g>
  <text x="56" y="30" font-family="'IBM Plex Mono', ui-monospace, monospace" font-size="15" font-weight="600" fill="#666" letter-spacing="0.5">{name}</text>
</svg>'''
    with open(f"{slug}.svg", "w") as f:
        f.write(svg)
    print(f"created {slug}.svg")
